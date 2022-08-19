import React, { useState, useEffect } from "react";
import "./App.css";
import bgLong from "./bg_long.png";
import bgShort from "./bg_short.png";
import html2canvas from 'html2canvas';

function App() {
  const [coin, setCoin] = useState("BTCUSDT");
  const [entryPrice, setEntryPrice] = useState(22898.0);
  const [closingPrice, setClosingPrice] = useState(23000.0);
  const [isLong, setIsLong] = useState(true);

  function downLoad() {
    console.log("download started!")
    const name = (isLong ? "Long-" : "Short-") + coin + "-" + entryPrice + "-" + closingPrice

    const image = document.getElementById('image');
    html2canvas(image).then(canvas => {
      onSaveAs(canvas.toDataURL('image/png'), name + '.png')
    });
  }

  const onSaveAs =(uri, filename)=> {
		var link = document.createElement('a');
		document.body.appendChild(link);
		link.href = uri;
		link.download = filename;
		link.click();
		document.body.removeChild(link);
	};

  return (
    <div className="App">
      <div>
        롱(체크)/숏(미체크) &nbsp;
        <input
          type="checkbox"
          checked={isLong}
          onChange={(e) => setIsLong(!isLong)}
        />
      </div>
      <br />
      <div>
        코인종류 &nbsp;
        <input value={coin} onChange={(e) => setCoin(e.target.value)} />
      </div>
      <br />
      <div>
        매수금액 &nbsp;
        <input
          value={entryPrice}
          onChange={(e) => setEntryPrice(e.target.value)}
        />
      </div>
      <br />
      <div>
        매도금액 &nbsp;
        <input
          value={closingPrice}
          onChange={(e) => setClosingPrice(e.target.value)}
        />
      </div>
      <br />
      <button onClick={downLoad}>다운로드</button>
      <br />
      <br />
      <Image
          entryPrice={entryPrice}
          closingPrice={closingPrice}
          coin={coin}
          isLong={isLong}
        />
    </div>
  );
}

function Image({ entryPrice, closingPrice, coin, isLong }) {
  const [result, setResult] = useState(
    ((closingPrice / entryPrice - 1) * 75 * 100).toFixed(2)
  );
  useEffect(() => {
    const calculated = ((closingPrice / entryPrice - 1) * 75 * 100).toFixed(2);
    if (!isLong && calculated < 0) {
      setResult(-calculated);
    } else {
      setResult(calculated);
    }
  }, [entryPrice, closingPrice, coin, isLong]);
  return (
    <div>
      <div
        id="image"
        style={{
          backgroundImage: `url(${isLong ? bgLong : bgShort})`,
          backgroundSize: "cover",
          height: "570px",
          width: "570px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "47px",
            top: "140px",
            fontSize: "20px",
            color: "white",
            fontFamily: "HarmonyOS Sans",
            fontWeight: "500",
          }}
        >
          {coin}
        </div>
        <div
          style={{
            position: "absolute",
            right: "300px",
            top: "258px",
            fontSize: "20px",
            color: "white",
            fontFamily: "HarmonyOS Sans",
            fontWeight: "500",
          }}
        >
          75X
        </div>
        <div
          style={{
            position: "absolute",
            right: "300px",
            top: "294px",
            fontSize: "20px",
            color: "white",
            fontFamily: "HarmonyOS Sans",
            fontWeight: "500",
          }}
        >
          ₮{entryPrice}
        </div>
        <div
          style={{
            position: "absolute",
            right: "300px",
            top: "330px",
            fontSize: "20px",
            color: "white",
            fontFamily: "HarmonyOS Sans",
            fontWeight: "500",
          }}
        >
          ₮{closingPrice}
        </div>

        <div
          style={{
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "40px",
              top: "192px",
              fontSize: "38px",
              color: "rgb(31, 163, 178)",
              fontFamily: "HarmonyOS Sans",
              fontWeight: "500",
            }}
          >
            {result > 0 ? (
              <span
                style={{
                  fontSize: "38px",
                  fontWeight: "400",
                }}
              >
                +
              </span>
            ) : (
              ""
            )}
            {result}
            <span
              style={{
                fontSize: "24px",
                fontWeight: "500",
              }}
            >
              %
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
