import sesaLogo from "./assets/sesa.png";
import adwait from "./assets/adwait.svg";
import Confetti from "./Confetti";
import "./App.css";

function App() {
  return (
    <>
      <Confetti />
      <img
        src={adwait}
        className="adwait footer-animation__image footer-animation__image--1"
        alt="Adwait"
      />
      <h1>APRIL FOOLS!</h1>
      <h2>
        Love from the{" "}
        <a href="https://sesa.org.nz/" target="_blank">
          <img src={sesaLogo} className="logo" alt="SESA logo" height={40} />
        </a>{" "}
        team &lt;3
      </h2>
    </>
  );
}

export default App;
