import React, { useState, useEffect } from "react";
import "./App.css";
import bgLong from "./bg_long.png";
import bgShort from "./bg_short.png";
import tanguPic from "./tangu.png";
import html2canvas from "html2canvas";

function App() {
  const [coin, setCoin] = useState("누사이퍼");
  const [price, setprice] = useState("NU");
  const [askPrice, setaskPrice] = useState("500"); 
  const [bidPrice, setbidPrice] = useState("550");
  const [maxPrice, setmaxPrice] = useState("100000");
  const [Amount, setAmount] = useState(((maxPrice/askPrice) - (maxPrice/askPrice*0.0005)).toFixed(6)); //eslint-disable-line no-unused-vars
  const [proceeds, setproceeds] = useState(((Amount*bidPrice)-(Amount*bidPrice*0.0005)+1).toFixed(0)); //eslint-disable-line no-unused-vars
  const [Valuation, setValuation] = useState(proceeds-maxPrice); //eslint-disable-line no-unused-vars
  const [isLong, setIsLong] = useState(true); //eslint-disable-line no-unused-vars
  const [numsLoc, setNumsLoc] = useState([227, 570, 570]);
  const [numLocLR, setNumLocLR] = useState(1000);
  const [leverage, setLeverage] = useState(1); //eslint-disable-line no-unused-vars
  const [result, setResult] = useState(
    ((bidPrice / askPrice - 1) * 75 * 100).toFixed(2)
  );
  const [tangu, setTangu] = useState(false);

  useEffect(() => {
    const calculated = (
      (bidPrice / askPrice - 1) *
      leverage *
      100
    ).toFixed(2);
    if (!isLong && calculated < 0) {
      setResult(-calculated);
    } else {
      setResult(calculated);
    }
  }, [askPrice, bidPrice, coin, isLong, leverage]);

  function downLoad() {
    console.log("download started!");
    const name =
      (isLong ? "Long-" : "Short-") +
      coin +
      "-" +
      askPrice +
      "-" +
      bidPrice;

    const image = document.getElementById("image");
    html2canvas(image).then((canvas) => {
      onSaveAs(canvas.toDataURL("image/png"), name + ".png");
    });
  }

  function down() {
    const one = numsLoc[0] + 1;
    const two = numsLoc[1] + 1;
    const three = numsLoc[2] + 1;
    setNumsLoc([one, two, three]);
  }
  function up() {
    const one = numsLoc[0] - 1;
    const two = numsLoc[1] - 1;
    const three = numsLoc[2] - 1;
    setNumsLoc([one, two, three]);
  }
  function left() {
    setNumLocLR(numLocLR - 1);
  }
  function right() {
    setNumLocLR(numLocLR + 1);
  }


  const onSaveAs = (uri, filename) => {
    var link = document.createElement("a");
    document.body.appendChild(link);
    link.href = uri;
    link.download = filename;
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="App">
      <span>
        코인종류 &nbsp;
        <input value={coin} onChange={(e) => setCoin(e.target.value)} />
      </span>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span>
        코인이름 &nbsp;
        <input value={price} onChange={(e) =>setprice(e.target.value)} />
      </span>
    &nbsp;&nbsp;&nbsp;&nbsp;
      <br />
      <br />
      <span>
        매수금액 &nbsp;
        <input
          value={maxPrice}
          onChange={(e) => setmaxPrice(e.target.value)}
        />
      </span>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span>
        매도금액 &nbsp;
        <input
          value={bidPrice}
          onChange={(e) => setbidPrice(e.target.value)}
        />
      </span>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span>
        평균단가 &nbsp;
        <input
          value={askPrice}
          onChange={(e) => setaskPrice(e.target.value)}
        />
      </span>
      <br />
      <br />
      <button onClick={up}>숫자 위로</button>
      <br />
      <br />
      <button onClick={left}>숫자 좌로</button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button onClick={right}>숫자 우로</button>
      <br />
      <br />
      <button onClick={down}>숫자 아래로</button>
      <br />
      <br />
      <button onClick={downLoad}>다운로드</button>
      <br />
      <br />
      <div
        id="image"
        style={{
          backgroundImage: `url(${tangu ? tanguPic : (isLong ? bgLong : bgShort)})`,
          backgroundSize: "cover",
          height: "419px",
          width: "916px",
          margin: "0 auto",
          position: "relative",
        }}
      >

          <div
            style={{
              position: "absolute",
              left: "27px",
              top: "70px",
              fontSize:"32px",
              color: "rgb(23,53,130)",
              fontFamily: "HarmonyOS Sans",
              fontWeight: "600",

            }}
          >
            {coin}
          </div>

                    <div
            style={{
              position: "absolute",
              left: "500px",
              top: "160px",
              fontSize:"42px",
              color: "rgb(0,0,0)",
              fontFamily: "HarmonyOS Sans",
              fontWeight: "500",

            }}
          >
            {proceeds.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 
           </div>          
                    <div
            style={{
              position: "absolute",
              left: "500px",
              top: "250px",
              fontSize:"42px",
              color: "rgb(0,0,0)",
              fontFamily: "HarmonyOS Sans",
              fontWeight: "500",

            }}
          >
            {Valuation.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </div>
         
                <div
            style={{
              position: "absolute",
              left: "27px",
              top: "100px",
              fontSize: "42px",
              color: "RGB(23,53,130)",
              fontFamily: "HarmonyOS Sans",
              fontWeight: "700",

            }}
          >
            ({price})
          </div>
          
          <div
            style={{
              position: "absolute",
              left: numLocLR - 810 + "px",
              top: numsLoc[0] + "px",
              fontSize: "28px",
              color: "RGB(126,126,126)",
              fontFamily: "HarmonyOS Sans",
              fontWeight: "500",

            }}
          >
            {price}
          </div>
          <div
            style={{
              position: "absolute",
              left: numLocLR - 915 + "px",
              top: numsLoc[1] + "px",
              fontSize: "30px",
              color: "white",
              fontFamily: "HarmonyOS Sans",
              fontWeight: "500",

            }}
          >
           {askPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </div>
          <div
            style={{
              position: "absolute",
              left: numLocLR - 730 + "px",
              top: numsLoc[2] + "px",
              fontSize: "30px",
              color: "black",
              fontFamily: "HarmonyOS Sans",
              fontWeight: "500",

            }}
          >
           {maxPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </div>
          <div
            style={{
              position: "absolute",
              left: "235px",
              top: "730px",
              fontSize: "28px",
              color: "black",
              fontFamily: "HarmonyOS Sans",
              fontWeight: "500",

            }}
          >
            {Amount}
          </div>
           <div
            style={{
              position: "relative",
            }}
          >
                <div
              style={{
                position: "absolute",
                left: "200px",
                top: "100px",
                fontSize: "55px",
                color: "red",
                fontFamily: "HarmonyOS Sans",
                fontWeight: "700",

              }}
            >
              {result}%

            </div>
          </div> 
      </div>
      <br />
      <br />
      <div>
        <i>Made By</i> <b>Jung Ji </b><span onClick={() => setTangu(!tangu)}><b>Ho</b></span>
      </div>
    </div>
  );
}

export default App;
