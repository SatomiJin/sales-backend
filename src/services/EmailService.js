const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const sendEmailCreateOrder = async (email, totalPrice, address, shippingPrice, orderItems, paymentMethod) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.MAIL_ACCOUNT,
      pass: process.env.MAIL_PASSWORD,
    },
  });
  const paymentWith = paymentMethod === "later_money" ? "Thanh toán khi nhận hàng" : "Thanh toán online với Paypal";
  let listItems = "";
  const attachImage = [];
  orderItems.forEach((order) => {
    listItems += `<div>
    <div>Bạn đã đặt sản phẩm ${order?.name}</div>
    <div>Số lượng: <b>${order?.amount}</b> Giá tiền: <b>${order?.price} VNĐ</b></div>
    </div>`;
    attachImage.push({
      path: order.image,
      filename: order.name,
    });
  });
  const info = await transporter.sendMail({
    from: process.env.MAIL_ACCOUNT, // sender address
    to: email, // list of receivers
    subject: "Bạn đã đặt hàng thành công tại Schwarzer Ritter", // Subject line
    text: "Sau đây là chi tiết sản phẩm đã đặt", // plain text body
    html: `<div><b>Bạn đã đặt hàng thành công tại Schwarzer Ritter</b></div>
    <div>${listItems}</div>
    <div>Phí vận chuyển: <b>${shippingPrice} VNĐ</b></div>
    <div>Phương thức thanh toán: ${paymentWith}</div>
    <div>Tổng thanh toán: <b>${totalPrice} VNĐ</b></div>
    <div>Tới địa chỉ: <b>${address}</b></div>`, // html body
    attachments: attachImage,
  });
};

module.exports = { sendEmailCreateOrder };
