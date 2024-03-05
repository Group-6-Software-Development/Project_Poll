import QRcode from "react-qr-code";

//TODO: generate lecture code function.

const value =
  "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley";

const LinkPage = () => {
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
