<?php

namespace Usama\Paypal\Controllers;

use App\Http\Controllers\Controller;
use App\Jobs\OrderSuccessProcessJob;
use App\Mail\OrderPaid;
use App\Models\Order;
use App\Models\Setting;
use App\Services\Traits\OrderTrait;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Mail\Markdown;
use Illuminate\Support\Facades\Mail;
use PayPal\Api\Amount;
use PayPal\Api\Details;
use PayPal\Api\Item;
use PayPal\Api\ItemList;
use PayPal\Api\Payer;
use PayPal\Api\Payment;
use PayPal\Api\RedirectUrls;
use PayPal\Api\Transaction;

class PaypalController extends Controller
{
    use OrderTrait;
    public function makePayment(Request $request)
    {
        try {
        $validator = validator($request->all(), ['netTotal' => 'required|numeric', 'order_id' => 'required|exists:orders,id']);
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator->errors()->first());
        }
        $clientId = env('PAYPAL_MODE') === 'sandbox' ? config('paypal.sandbox_secret_client_id') : config('paypal.live_secret_client_id');
        $clientSecret = env('PAYPAL_MODE') === 'sandbox' ? config('paypal.sandbox_client_secret') : config('paypal.live_client_secret');
        $apiContext = new \PayPal\Rest\ApiContext(new \PayPal\Auth\OAuthTokenCredential($clientId,$clientSecret));
            // Step 2.1 : Between Step 2 and Step 3
            $apiContext->setConfig(
                array(
                    'log.LogEnabled' => true,
                    'log.FileName' => 'PayPal.log',
                    'log.LogLevel' => 'DEBUG',
                    'mode' => config('paypal.model')
                )
            );
            // Create new payer and method
        $payer = new Payer();
        $payer->setPaymentMethod("paypal");

        // Set redirect URLs
        $redirectUrls = new RedirectUrls();
        $redirectUrls->setReturnUrl(route('paypal.web.payment.result'))
            ->setCancelUrl(route('paypal.web.payment.cancel'));

        // Set payment amount
        $amount = new Amount();
        $amount->setCurrency("USD")
            ->setTotal($request->netTotal);

        // Set transaction object
        $transaction = new Transaction();
        $transaction->setAmount($amount)
            ->setDescription("Payment description");

        // Create the full payment object
        $payment = new Payment();
        $payment->setIntent('sale')
            ->setPayer($payer)
            ->setRedirectUrls($redirectUrls)
            ->setTransactions(array($transaction));
        // Create payment with valid API context

            $payment->create($apiContext);
            dd($payment);
            // Get PayPal redirect URL and redirect the customer
            $approvalUrl = $payment->getApprovalLink();
            $this->updateOrderRerferenceId($request->order_id, $payment->id);
            return response()->json($approvalUrl, 200);

            // Redirect the customer to $approvalUrl
        } catch (PayPal\Exception\PayPalConnectionException $ex) {
            dd('code : ' . $ex->getCode() . 'data :' .$ex->getData());
        } catch (Exception $ex) {
            die($ex);
        }
    }

    public function result(Request $request)
    {
        $validator = validator($request->all(), [
            'paymentId' => 'required'
        ]);
        if($validator->fails()) {
            return redirect()->route('frontend.home')->with('error', trans('process_failure'));
        }
        $order = Order::where(['reference_id' => $request->paymentId, 'paid' => false])->with('user','order_metas.ordermetable')->first();
        $order->update([
            'paid' => true,
            'status' => 'paid'
        ]);
        $settings = Setting::first();
        Mail::to($settings->email)->cc($order->user->email)->send(new OrderPaid($order));
        $markdown = new Markdown(view(), config('mail.markdown'));
        return $markdown->render('emails.orders.paid', ['order' => $order]);
    }

    public function cancel()
    {
        return redirect()->route('frontend.home')->with('error', trans('process_failure'));
    }
}