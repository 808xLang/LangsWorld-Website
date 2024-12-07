import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";

const createOrder = async () => {
  try {
    const response = await fetch("/api/paypal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // use the "body" param to optionally pass additional order information
      // like product ids and quantities
      body: JSON.stringify({
        cart: [
          {
            id: "YOUR_PRODUCT_ID",
            quantity: "YOUR_PRODUCT_QUANTITY",
          },
        ],
      }),
    });

    const orderData = await response.json();
    debugger;
    

    if (orderData.id) {
      console.log('RAN SUCCESSFULLY - JUSTIN IS TUFF')
      return orderData.id;
    }
    const errorDetail = orderData?.details?.[0];
    const errorMessage = errorDetail
      ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
      : JSON.stringify(orderData);

    throw new Error(errorMessage);
  } catch (error) {
    console.error(error);
    throw new Error((error as Error).message);
  }
};

const initialOptions = {
  clientId:
    "AaBeE-o5gQ1fcWYIZFpA5vglirIXzcpgAU_NXGhdEO2g_xPgseIv4S_K9lrbS_g0815DusZKfEgnJ02S",
  "enable-funding": "venmo",
  "disable-funding": "",
  "buyer-country": "US",
  currency: "USD",
  "data-page-type": "product-details",
  components: "buttons",
  "data-sdk-integration-source": "developer-studio",
};

export default function PaymentOption() {
  return (
    <div className="App">
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{
            shape: "pill",
            layout: "vertical",
            color: "gold",
            label: "paypal",
          }}
          onClick={createOrder}
        />
      </PayPalScriptProvider>
    </div>
  );
}
