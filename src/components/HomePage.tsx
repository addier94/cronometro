import React, { FC, useEffect, useState } from 'react';
import './HomePage.scss';
import StatusButtons from './StatusButtons';

const add0 = <T extends number>(value:T) => {
  if (value.toString().length > 1) {
    return value;
  }
  return `0${value}`;
};

function HomePage() {
  const [time, setTime] = useState({
    ms: 0, s: 0, m: 0, h: 0,
  });
  const [interv, setInterv] = useState<any>();
  const [status, setStatus] = useState(0);

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
    setStatus(0);
    setTime({
      ms: 0, s: 0, m: 0, h: 0,
    });
  };
  const startTimer = () => {
    // run();
    setStatus(1);
    setInterv(setInterval(run, 10));
    console.log('interv', typeof interv);
  };

  const stop = () => {
    clearInterval(interv);
    console.log('interv2', typeof interv);

    setStatus(2);
  };

  return (
    <div className="HomePage">
      <header>domain.com</header>
      <article>
        <div className="div">
          <main>
            <section className="">
              {`${add0(time.h)}:${add0(time.m)}:${add0(time.s)}`}

              <span>{add0(time.ms)}</span>
            </section>
          </main>
          <StatusButtons status={status} startTimer={startTimer} stop={stop} reset={reset} />
        </div>
      </article>
    </div>
  );
}

export default HomePage;
