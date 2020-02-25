/*----------------------------------------*\
  bcksp.es - debugPurchase.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-24 12:50:47
  @Last Modified time: 2020-02-24 12:57:47
\*----------------------------------------*/
export const debugPurchase = {
  "order": {
    "id": "1HU3842963171643D",
    "status": "COMPLETED",
    "purchase_units": [
      {
        "shipping": {
          "name": {
            "full_name": "John Doe"
          },
          "address": {
            "address_line_1": "av van volxem 319",
            "admin_area_2": "Forest",
            "admin_area_1": "CA",
            "postal_code": "1190",
            "country_code": "BE"
          }
        },
        "payments": {
          "captures": [
            {
              "status": "COMPLETED",
              "id": "1UR441785C7916353",
              "final_capture": true,
              "create_time": "2020-02-24T11:47:13Z",
              "update_time": "2020-02-24T11:47:13Z",
              "amount": {
                "value": "20.00",
                "currency_code": "EUR"
              },
              "seller_protection": {
                "status": "ELIGIBLE",
                "dispute_categories": [
                  "ITEM_NOT_RECEIVED",
                  "UNAUTHORIZED_TRANSACTION"
                ]
              },
              "links": [
                {
                  "href": "https://api.sandbox.paypal.com/v2/payments/captures/1UR441785C7916353",
                  "rel": "self",
                  "method": "GET",
                  "title": "GET"
                },
                {
                  "href": "https://api.sandbox.paypal.com/v2/payments/captures/1UR441785C7916353/refund",
                  "rel": "refund",
                  "method": "POST",
                  "title": "POST"
                },
                {
                  "href": "https://api.sandbox.paypal.com/v2/checkout/orders/1HU3842963171643D",
                  "rel": "up",
                  "method": "GET",
                  "title": "GET"
                }
              ]
            }
          ]
        }
      }
    ]
  }
}