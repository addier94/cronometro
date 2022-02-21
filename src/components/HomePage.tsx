import { useState } from 'react';
import './HomePage.scss';

// helpers
const add0 = (value:number) => {
  if (value.toString().length > 1) {
    return value;
  }
  return `0${value}`;
};

// btn component
interface PropsBtn {
  text:string,
  color: string,
  click: () => void
}
const Btn: React.FC<PropsBtn> = ({ text, color, click }:PropsBtn) => (
  <button type="button" className={`Buttons ${color}`} onClick={click}>
    {text}
  </button>
);

interface IProps {
timeStop: boolean,
startTimer: () => void,
stop: () => void,
reset: () => void,
}

const Buttons = ({ timeStop, startTimer, stop, reset }:IProps) => (
  <footer className="grid grid-cols-2 gap-x-2 text-3xl">
    {timeStop && <Btn text="Start" color="bg-green-500" click={startTimer} /> }
    {!timeStop && <Btn text="Pause" color="bg-yellow-500" click={stop} /> }

    <Btn text="Reset" color="bg-red-600" click={reset} />
  </footer>
);

// end btn component

function HomePage() {
  const [time, setTime] = useState({
    ms: 0, s: 0, m: 0, h: 0,
  });
  const [interv, setInterv] = useState<any>();
  const [timeStop, setTimeStop] = useState(true);

  let updatedMs = time.ms; let updatedS = time.s; let updatedM = time.m; let
    updatedH = time.h;

  const run = () => {
    if (updatedM === 60) {
      updatedH += 1;
      updatedM = 0;
    }
    if (updatedS === 60) {
      updatedM += 1;
      updatedS = 0;
    }
    if (updatedMs === 100) {
      updatedS += 1;
      updatedMs = 0;
    }
    updatedMs += 1;
    return setTime({
      ms: updatedMs, s: updatedS, m: updatedM, h: updatedH,
    });
  };
  const reset = () => {
    clearInterval(interv);
    setTimeStop(true);
    setTime({
      ms: 0, s: 0, m: 0, h: 0,
    });
  };
  const startTimer = () => {
    setTimeStop(false);
    setInterv(setInterval(run, 10));
  };

  const stop = () => {
    clearInterval(interv);

    setTimeStop(true);
  };

  return (
    <div className="HomePage">
      <article>
        <div className="div">
          <main>
            <section className="">
              {`${add0(time.h)}:${add0(time.m)}:${add0(time.s)}`}

              <span>{add0(time.ms)}</span>
            </section>
          </main>
          <Buttons timeStop={timeStop} startTimer={startTimer} stop={stop} reset={reset} />
        </div>
      </article>
    </div>
  );
}

export default HomePage;
