import { CreatedOrderReturnType } from 'src/order/types/createdOrder';

export function generateOrderEmail(order: CreatedOrderReturnType): string {
  const {
    totalAmount,
    status,
    city,
    postalCode,
    street,
    streetNumber,
    createdAt,
    OrderItems = [],
  } = order;

  const formattedDate = new Date(createdAt);

  const itemsHtml = OrderItems.map((item: any) => {
    const subtotal = item.unitPrice * item.quantity;
    return `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.Record.name}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.Record.artist}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.unitPrice} RSD</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${subtotal} RSD</td>
      </tr>
    `;
  }).join('');

  return `
    <!DOCTYPE html>
    <html lang="sr">
      <head>
        <meta charset="UTF-8" />
        <title>Potvrda porudžbine</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f6f8fa; margin: 0; padding: 0;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f6f8fa; padding: 40px 0;">
          <tr>
            <td align="center">
              <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                <tr>
                  <td style="background-color: #2563eb; color: #ffffff; text-align: center; padding: 20px 0;">
                    <h1 style="margin: 0; font-size: 24px;">Potvrda porudžbine</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 30px;">
                    <p style="font-size: 16px; color: #333;">Poštovani,</p>
                    <p style="font-size: 16px; color: #333;">
                      Hvala vam na porudžbini! U nastavku su detalji vaše narudžbine:
                    </p>

                    <table width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top: 20px; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Status:</strong></td>
                        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${status}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Ukupan iznos:</strong></td>
                        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${totalAmount} RSD</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Adresa isporuke:</strong></td>
                        <td style="padding: 8px; border-bottom: 1px solid #ddd;">
                          ${street} ${streetNumber}, ${city} ${postalCode}
                        </td>
                      </tr>
                    </table>

                    <h3 style="margin-top: 30px; color: #2563eb;">Stavke porudžbine</h3>
                    <table width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse: collapse;">
                      <thead>
                        <tr>
                          <th align="left" style="border-bottom: 2px solid #2563eb; padding: 8px;">Naziv ploce</th>
                          <th align="left" style="border-bottom: 2px solid #2563eb; padding: 8px;">Umetnik</th>
                          <th align="left" style="border-bottom: 2px solid #2563eb; padding: 8px;">Cena po komadu</th>
                          <th align="left" style="border-bottom: 2px solid #2563eb; padding: 8px;">Količina</th>
                          <th align="left" style="border-bottom: 2px solid #2563eb; padding: 8px;">Ukupno</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${itemsHtml}
                      </tbody>
                    </table>

                    <p style="margin-top: 30px; font-size: 14px; color: #555;">
                      Porudžbina je kreirana <strong>${formattedDate}</strong>.
                    </p>

                    <p style="margin-top: 40px; font-size: 12px; color: #999; text-align: center;">
                      © ${new Date().getFullYear()} SpinRecords • Beograd, Srbija
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}
