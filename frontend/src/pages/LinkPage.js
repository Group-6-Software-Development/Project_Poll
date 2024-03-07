import QRcode from "react-qr-code";

const LinkPage = () => {
  const lectureUUID = window.location.pathname.split("/")[2];

  const value = `http://192.168.50.232:3000/review/${lectureUUID}`;

  return (
    <div className="link-page">
      <div className="qr-link">
        <QRcode
          size={128}
          style={{ height: "auto", maxWidth: "200%", width: "200%" }}
          value={value}
        />
      </div>
      <div className="link-text">
        <h2>{value}</h2>
      </div>
    </div>
  );
};

export default LinkPage;
