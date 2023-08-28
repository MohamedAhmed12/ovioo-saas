'use client';

import '@/styles/app/unauth/about-us.scss';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <div className="hero-about">
        <div className="hero-container">
          <div className="title-text tab-mob">
            <div className="h1 test-hero">
              <strong className="text-gradient-h1">awesomic</strong>
              <span className="hero-title-span">=</span>
              <strong>Awesome</strong> companies{' '}
              <span className="hero-title-span">+</span>
              <strong>cosmic</strong> designers
            </div>
          </div>
          <div className="title-text-about desk-ab">
            <h1 className="h1 hero">
              <span className="text-gradient-h1">
                <strong>awesomic</strong>
              </span>
              <span className="hero-title-span about-us">=</span>
              <strong>awesome</strong> companies
              <br />+ <strong>cosmic</strong> designers
            </h1>
          </div>
        </div>
        <div className="hero-facts-wrapper about desktop-ver">
          <div className="fact-wrapper">
            <div>
              <div className="about-us-fact-figure">2019</div>
            </div>
            <div className="about-us-facts-eclipse">
              <Image
                src="/assets/images/timeline.png"
                loading="lazy"
                width="61"
                alt=""
              />
              <div className="about-us-facts-line"></div>
            </div>
            <div>
              <div className="body-text-l">
                Beta launch on
                <br />
                <strong className="h6">Product Hunt</strong>
              </div>
            </div>
          </div>
          <div className="fact-wrapper">
            <div>
              <div className="about-us-fact-figure">2020</div>
            </div>
            <div className="about-us-facts-eclipse">
              <Image
                src="/assets/images/timeline.png"
                loading="lazy"
                width="61"
                alt=""
              />
              <div className="about-us-facts-line"></div>
            </div>
            <div>
              <div className="body-text-l">
                <strong className="h6">Funded</strong> during
                <br />
                the pandemic
              </div>
            </div>
          </div>
          <div className="fact-wrapper">
            <div>
              <div className="about-us-fact-figure">2021</div>
            </div>
            <div className="about-us-facts-eclipse">
              <Image
                src="/assets/images/timeline.png"
                loading="lazy"
                width="61"
                alt=""
              />
            </div>
            <div>
              <div className="body-text-l">
                Worked with
                <br />
                <strong className="h6">1000+</strong> customers
              </div>
            </div>
          </div>
        </div>
        <div className="hero-facts-wrapper about mobile-adapted">
          <div className="step-wrapper">
            <div>
              <div className="about-us-fact-figure">2019</div>
            </div>
            <div className="steps-text">
              <div className="body-text-l">
                Beta launch on
                <br />
                <strong className="h6">Product Hunt</strong>
              </div>
            </div>
          </div>
          <div className="steps-divider about"></div>
          <div className="step-wrapper">
            <div>
              <div className="about-us-fact-figure">2020</div>
            </div>
            <div className="steps-text">
              <div className="body-text-l">
                <strong className="h6">Funded</strong> during
                <br />
                the pandemic
              </div>
            </div>
          </div>
          <div className="steps-divider about"></div>
          <div className="step-wrapper">
            <div>
              <div className="about-us-fact-figure">2021</div>
            </div>
            <div className="steps-text">
              <div className="body-text-l">
                Worked with
                <br />
                <strong className="h6">1000+</strong> customers
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section astronauts">
        <div className="astronaut-container">
          <Image
            src="/assets/images/roman.png"
            loading="lazy"
            alt="Awesomic astronaut founder Roman"
            className="roman"
          />
          <Image
            src="/assets/images/nastya.png"
            loading="lazy"
            alt="Awesomic astronaut founder Stacy"
            className="nastya"
          />
          <Image
            src="/svg/stars-circle-about.svg"
            loading="lazy"
            alt="Awesomic constellation"
            className="stars-circle-about"
          />
          <div className="astronaut-text-1">
            <div className="astronaut-text">Once, a young</div>
            <div className="astronaut-text second-line">Software engineer</div>
            <Image
              src="/svg/arrow-up.svg"
              loading="lazy"
              alt="arrow pointing left"
              className="arrow-up"
            />
          </div>
          <div className="astronaut-text-2">
            <div className="astronaut-text">Digital marketer</div>
            <div className="astronaut-text second-line down">on Tinder</div>
            <Image
              src="/svg/arrow-down.svg"
              loading="lazy"
              alt="arrow pointing right"
              className="arrow-down"
            />
          </div>
          <div className="astronaut-text-3">
            <div className="astronaut-text">Met</div>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="info-container">
          <div className="text-info-1 about-page">
            <h2 className="heading-style-h2 about-page">
              Algorithms matched us — now, we’ve created an algorithm to help
              others, matching businesses with the best-fit designers.
            </h2>
          </div>
          <div className="lottie-animation-1">
            <div
              className="lottie-awesomic-hero"
              data-w-id="c374bb05-8fca-7efa-d273-c488b0c69ffc"
              data-animation-type="lottie"
              data-src="https://uploads-ssl.webflow.com/602d59da29b66668b8758391/603961a23b870e2d9cc3f160_Megnit%20(1).json"
              data-loop="1"
              data-direction="-1"
              data-autoplay="1"
              data-is-ix2-target="0"
              data-renderer="svg"
              data-default-duration="2"
              data-duration="0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 692 692"
                width="692"
                height="692"
                preserveAspectRatio="xMidYMid meet"
                style={{
                  width: '100%',
                  height: '100%',
                  transform: 'translate3d(0px, 0px, 0px)',
                  willChange: 'transform',
                  contentVisibility: 'visible',
                }}
              >
                <defs>
                  <clipPath id="__lottie_element_68">
                    <rect width="692" height="692" x="0" y="0"></rect>
                  </clipPath>
                  <linearGradient
                    id="__lottie_element_72"
                    spreadMethod="pad"
                    gradientUnits="userSpaceOnUse"
                    x1="132.26699829101562"
                    y1="-76.26699829101562"
                    x2="-120"
                    y2="74.66699981689453"
                  >
                    <stop offset="0%" stop-color="rgb(237,160,145)"></stop>
                    <stop offset="28%" stop-color="rgb(239,190,158)"></stop>
                    <stop offset="56%" stop-color="rgb(238,104,127)"></stop>
                  </linearGradient>
                  <clipPath id="__lottie_element_74">
                    <path d="M0,0 L692,0 L692,692 L0,692z"></path>
                  </clipPath>
                  <linearGradient
                    id="__lottie_element_80"
                    spreadMethod="pad"
                    gradientUnits="userSpaceOnUse"
                    x1="-88.19999694824219"
                    y1="-21.132999420166016"
                    x2="48"
                    y2="17.066999435424805"
                  >
                    <stop offset="0%" stop-color="rgb(190,177,191)"></stop>
                    <stop offset="28%" stop-color="rgb(154,152,234)"></stop>
                    <stop offset="56%" stop-color="rgb(103,108,226)"></stop>
                  </linearGradient>
                  <linearGradient
                    id="__lottie_element_84"
                    spreadMethod="pad"
                    gradientUnits="userSpaceOnUse"
                    x1="-48.53300094604492"
                    y1="-16.735000610351562"
                    x2="43.20000076293945"
                    y2="28.065000534057617"
                  >
                    <stop offset="0%" stop-color="rgb(237,160,145)"></stop>
                    <stop offset="28%" stop-color="rgb(239,190,158)"></stop>
                    <stop offset="56%" stop-color="rgb(237,160,145)"></stop>
                  </linearGradient>
                </defs>
                <g clip-path="url(#__lottie_element_68)">
                  <g
                    transform="matrix(0.9998535513877869,-0.01711455173790455,0.01711455173790455,0.9998535513877869,286.79998779296875,346)"
                    opacity="1"
                    style={{ display: 'block' }}
                  >
                    <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                      <path
                        stroke="url(#__lottie_element_72)"
                        stroke-linecap="butt"
                        stroke-linejoin="miter"
                        fill-opacity="0"
                        stroke-miterlimit="4"
                        stroke-opacity="1"
                        stroke-width="2"
                        d=" M56.768001556396484,86.27400207519531 C64.2040023803711,85.66600036621094 71.51399993896484,84.0530014038086 78.48300170898438,81.4800033569336 C79.60399627685547,81.07499694824219 80.71199798583984,80.65599822998047 81.81900024414062,80.18299865722656 C81.81900024414062,80.18299865722656 100.80000305175781,135.55299377441406 100.80000305175781,135.55299377441406 C83.47799682617188,141.3040008544922 65.26200103759766,144.1580047607422 46.941001892089844,143.9929962158203 C46.941001892089844,143.9929962158203 46.67499923706055,143.9929962158203 46.67499923706055,143.9929962158203 C6.386000156402588,143.9929962158203 -30.735000610351562,129.69200134277344 -57.861000061035156,103.70899963378906 C-85.49099731445312,77.25299835205078 -100.7300033569336,40.345001220703125 -100.80000305175781,-0.04800000041723251 C-100.87000274658203,-40.441001892089844 -85.75800323486328,-77.23999786376953 -58.268001556396484,-103.66899871826172 C-31.26799964904785,-129.61199951171875 5.7270002365112305,-143.99400329589844 45.90399932861328,-143.99400329589844 C45.90399932861328,-143.99400329589844 46.21200180053711,-143.99400329589844 46.21200180053711,-143.99400329589844 C64.7040023803711,-144.1439971923828 83.08599853515625,-141.24400329589844 100.56199645996094,-135.41900634765625 C100.56199645996094,-135.41900634765625 81.86100006103516,-80.91400146484375 81.86100006103516,-80.91400146484375 C70.96099853515625,-85.23300170898438 59.28799819946289,-87.4489974975586 47.50199890136719,-87.43699645996094 C-2.4179999828338623,-87.43699645996094 -38.76900100708008,-48.09000015258789 -38.76900100708008,0 C-38.76900100708008,48.09000015258789 -2.4179999828338623,86.70600128173828 47.50199890136719,86.70600128173828 C49.5629997253418,86.70600128173828 51.58100128173828,86.625 53.599998474121094,86.48999786376953 C54.60900115966797,86.43599700927734 55.61899948120117,86.3550033569336 56.599998474121094,86.27400207519531 C56.599998474121094,86.27400207519531 56.768001556396484,86.27400207519531 56.768001556396484,86.27400207519531z"
                      ></path>
                    </g>
                  </g>
                  <g
                    clip-path="url(#__lottie_element_74)"
                    transform="matrix(-0.9787669777870178,-0.20497596263885498,0.20497596263885498,-0.9787669777870178,896.5781860351562,779.4547729492188)"
                    opacity="1"
                    style={{ display: 'block' }}
                  >
                    <g
                      transform="matrix(-1,0,0,1,462.79998779296875,402.6448669433594)"
                      opacity="1"
                      style={{ display: 'block' }}
                    >
                      <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                        <path
                          stroke="url(#__lottie_element_80)"
                          stroke-linecap="butt"
                          stroke-linejoin="miter"
                          fill-opacity="0"
                          stroke-miterlimit="4"
                          stroke-opacity="1"
                          stroke-width="2"
                          d=" M0,43.20000076293945 C23.858999252319336,43.20000076293945 43.20000076293945,23.858999252319336 43.20000076293945,0 C43.20000076293945,-23.858999252319336 23.858999252319336,-43.20000076293945 0,-43.20000076293945 C-23.858999252319336,-43.20000076293945 -43.20000076293945,-23.858999252319336 -43.20000076293945,0 C-43.20000076293945,23.858999252319336 -23.858999252319336,43.20000076293945 0,43.20000076293945z"
                        ></path>
                      </g>
                    </g>
                    <g
                      transform="matrix(1,0,0,1,462.79998779296875,285.20550537109375)"
                      opacity="1"
                      style={{ display: 'block' }}
                    >
                      <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                        <path
                          stroke="url(#__lottie_element_84)"
                          stroke-linecap="butt"
                          stroke-linejoin="miter"
                          fill-opacity="0"
                          stroke-miterlimit="4"
                          stroke-opacity="1"
                          stroke-width="2"
                          d=" M42.46799850463867,-5.599999904632568 C42.742000579833984,-5.357999801635742 42.91699981689453,-5.021999835968018 42.95899963378906,-4.658999919891357 C42.95899963378906,-4.658999919891357 42.95899963378906,-4.658999919891357 42.95899963378906,-4.658999919891357 C43.28900146484375,-1.531999945640564 43.279998779296875,1.621999979019165 42.93199920654297,4.747000217437744 C42.88999938964844,5.110000133514404 42.71500015258789,5.446000099182129 42.441001892089844,5.688000202178955 C42.16699981689453,5.929999828338623 41.81399917602539,6.063000202178955 41.448001861572266,6.060999870300293 C41.448001861572266,6.060999870300293 14.468999862670898,6.060999870300293 14.468999862670898,6.060999870300293 C14.468999862670898,6.060999870300293 33.54999923706055,25.13599967956543 33.54999923706055,25.13599967956543 C33.80799865722656,25.39900016784668 33.96099853515625,25.746999740600586 33.97999954223633,26.114999771118164 C33.999000549316406,26.482999801635742 33.88399887084961,26.844999313354492 33.654998779296875,27.132999420166016 C31.714000701904297,29.558000564575195 29.51099967956543,31.761999130249023 27.084999084472656,33.70199966430664 C26.798999786376953,33.93600082397461 26.43400001525879,34.05500030517578 26.065000534057617,34.0359992980957 C25.695999145507812,34.016998291015625 25.347000122070312,33.86000061035156 25.086999893188477,33.59700012207031 C25.086999893188477,33.59700012207031 6.00600004196167,14.520999908447266 6.00600004196167,14.520999908447266 C6.00600004196167,14.520999908447266 6.00600004196167,41.465999603271484 6.00600004196167,41.465999603271484 C6.00600004196167,41.83100128173828 5.872000217437744,42.183998107910156 5.630000114440918,42.457000732421875 C5.388000011444092,42.72999954223633 5.053999900817871,42.904998779296875 4.691999912261963,42.95000076293945 C3.134000062942505,43.11800003051758 1.5679999589920044,43.20199966430664 0.0010000000474974513,43.20000076293945 C-1.5570000410079956,43.20199966430664 -3.115000009536743,43.11800003051758 -4.664000034332275,42.95000076293945 C-5.026000022888184,42.904998779296875 -5.360000133514404,42.72999954223633 -5.6020002365112305,42.457000732421875 C-5.843999862670898,42.183998107910156 -5.978000164031982,41.83100128173828 -5.978000164031982,41.465999603271484 C-5.978000164031982,41.465999603271484 -5.978000164031982,14.494999885559082 -5.978000164031982,14.494999885559082 C-5.978000164031982,14.494999885559082 -25.05900001525879,33.56999969482422 -25.05900001525879,33.56999969482422 C-25.316999435424805,33.83100128173828 -25.66200065612793,33.987998962402344 -26.027999877929688,34.0099983215332 C-26.393999099731445,34.03200149536133 -26.756000518798828,33.917999267578125 -27.042999267578125,33.68899917602539 C-28.263999938964844,32.71099853515625 -29.43199920654297,31.66699981689453 -30.538999557495117,30.562000274658203 C-31.645000457763672,29.45599937438965 -32.68899917602539,28.288000106811523 -33.66600036621094,27.066999435424805 C-33.89500045776367,26.77899932861328 -34.0099983215332,26.41699981689453 -33.99100112915039,26.048999786376953 C-33.97200012207031,25.680999755859375 -33.819000244140625,25.333999633789062 -33.56100082397461,25.070999145507812 C-33.56100082397461,25.070999145507812 -14.479999542236328,5.994999885559082 -14.479999542236328,5.994999885559082 C-14.479999542236328,5.994999885559082 -41.45899963378906,5.994999885559082 -41.45899963378906,5.994999885559082 C-41.82500076293945,5.997000217437744 -42.17900085449219,5.864999771118164 -42.452999114990234,5.623000144958496 C-42.72700119018555,5.38100004196167 -42.902000427246094,5.045000076293945 -42.944000244140625,4.682000160217285 C-43.2859992980957,1.5729999542236328 -43.2859992980957,-1.562999963760376 -42.944000244140625,-4.671999931335449 C-42.902000427246094,-5.034999847412109 -42.72700119018555,-5.370999813079834 -42.452999114990234,-5.61299991607666 C-42.17900085449219,-5.855000019073486 -41.82500076293945,-5.98799991607666 -41.45899963378906,-5.986000061035156 C-41.45899963378906,-5.986000061035156 -14.47999954223
         6328,-5.986000061035156 -14.479999542236328,-5.986000061035156 C-14.479999542236328,-5.986000061035156 -33.56100082397461,-25.073999404907227 -33.56100082397461,-25.073999404907227 C-33.82099914550781,-25.33300018310547 -33.974998474121094,-25.68000030517578 -33.99399948120117,-26.04599952697754 C-34.01300048828125,-26.41200065612793 -33.89699935913086,-26.773000717163086 -33.66600036621094,-27.058000564575195 C-32.68899917602539,-28.27899932861328 -31.645000457763672,-29.445999145507812 -30.538999557495117,-30.552000045776367 C-29.433000564575195,-31.65399932861328 -28.270000457763672,-32.698001861572266 -27.055999755859375,-33.67900085449219 C-26.767000198364258,-33.909000396728516 -26.40399932861328,-34.02399826049805 -26.03499984741211,-34.00199890136719 C-25.666000366210938,-33.97999954223633 -25.319000244140625,-33.823001861572266 -25.05900001525879,-33.56100082397461 C-25.05900001525879,-33.56100082397461 -5.978000164031982,-14.484999656677246 -5.978000164031982,-14.484999656677246 C-5.978000164031982,-14.484999656677246 -5.978000164031982,-41.45600128173828 -5.978000164031982,-41.45600128173828 C-5.980999946594238,-41.823001861572266 -5.8480000495910645,-42.17900085449219 -5.605999946594238,-42.45500183105469 C-5.363999843597412,-42.73099899291992 -5.0289998054504395,-42.909000396728516 -4.664000034332275,-42.95399856567383 C-1.5579999685287476,-43.28200149536133 1.5729999542236328,-43.28200149536133 4.678999900817871,-42.95399856567383 C5.044000148773193,-42.909000396728516 5.379000186920166,-42.73099899291992 5.620999813079834,-42.45500183105469 C5.86299991607666,-42.17900085449219 5.995999813079834,-41.823001861572266 5.993000030517578,-41.45600128173828 C5.993000030517578,-41.45600128173828 5.993000030517578,-14.472000122070312 5.993000030517578,-14.472000122070312 C5.993000030517578,-14.472000122070312 25.073999404907227,-33.547000885009766 25.073999404907227,-33.547000885009766 C25.333999633789062,-33.808998107910156 25.680999755859375,-33.96699905395508 26.049999237060547,-33.98899841308594 C26.41900062561035,-34.01100158691406 26.781999588012695,-33.895999908447266 27.070999145507812,-33.66600036621094 C28.28499984741211,-32.685001373291016 29.447999954223633,-31.641000747680664 30.554000854492188,-30.538999557495117 C31.65999984741211,-29.433000564575195 32.70399856567383,-28.266000747680664 33.680999755859375,-27.045000076293945 C33.9119987487793,-26.760000228881836 34.02899932861328,-26.39900016784668 34.0099983215332,-26.033000946044922 C33.99100112915039,-25.66699981689453 33.83599853515625,-25.31999969482422 33.57600021362305,-25.06100082397461 C33.57600021362305,-25.06100082397461 14.494999885559082,-5.9730000495910645 14.494999885559082,-5.9730000495910645 C14.494999885559082,-5.9730000495910645 41.4739990234375,-5.9730000495910645 41.4739990234375,-5.9730000495910645 C41.84000015258789,-5.974999904632568 42.194000244140625,-5.8420000076293945 42.46799850463867,-5.599999904632568z"
                        ></path>
                      </g>
                    </g>
                  </g>
                  <g
                    transform="matrix(0.5,0,0,0.5,488.375,359.75)"
                    opacity="1"
                    style={{ display: 'none' }}
                  >
                    <path
                      stroke-linecap="butt"
                      stroke-linejoin="miter"
                      fill-opacity="0"
                      stroke-miterlimit="4"
                      stroke="rgb(240,198,161)"
                      stroke-opacity="1"
                      stroke-width="2"
                      d=" M58.52000045776367,-52.07500076293945 C58.176998138427734,-50.02299880981445 57.37900161743164,-45.24300003051758 56.46900177001953,-39.79499816894531"
                    ></path>
                    <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                      <path
                        stroke-linecap="butt"
                        stroke-linejoin="miter"
                        fill-opacity="0"
                        stroke-miterlimit="4"
                        stroke="rgb(240,198,161)"
                        stroke-opacity="1"
                        stroke-width="2"
                        d=" M58.52000045776367,-52.07500076293945 C58.176998138427734,-50.02299880981445 57.37900161743164,-45.24300003051758 56.46900177001953,-39.79499816894531"
                      ></path>
                    </g>
                  </g>
                  <g
                    transform="matrix(0.49081358313560486,0.0954044982790947,-0.0954044982790947,0.49081358313560486,428.27606201171875,350.8153381347656)"
                    opacity="1"
                    style={{ display: 'none' }}
                  >
                    <path
                      stroke-linecap="butt"
                      stroke-linejoin="miter"
                      fill-opacity="0"
                      stroke-miterlimit="4"
                      stroke="rgb(240,198,161)"
                      stroke-opacity="1"
                      stroke-width="2"
                      d=" M62.10599899291992,-48.71200180053711 C62.10599899291992,-48.71200180053711 62.13199996948242,-48.61800003051758 62.180999755859375,-48.439998626708984"
                    ></path>
                    <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                      <path
                        stroke-linecap="butt"
                        stroke-linejoin="miter"
                        fill-opacity="0"
                        stroke-miterlimit="4"
                        stroke="rgb(240,198,161)"
                        stroke-opacity="1"
                        stroke-width="2"
                        d=" M62.10599899291992,-48.71200180053711 C62.10599899291992,-48.71200180053711 62.13199996948242,-48.61800003051758 62.180999755859375,-48.439998626708984"
                      ></path>
                    </g>
                  </g>
                  <g
                    transform="matrix(-0.05226423218846321,-0.4972609579563141,0.4972609579563141,-0.05226423218846321,423.0529479980469,498.87860107421875)"
                    opacity="1"
                    style={{ display: 'none' }}
                  >
                    <path
                      stroke-linecap="butt"
                      stroke-linejoin="miter"
                      fill-opacity="0"
                      stroke-miterlimit="4"
                      stroke="rgb(240,198,161)"
                      stroke-opacity="1"
                      stroke-width="2"
                      d=" M58.698001861572266,-53.143001556396484 C58.698001861572266,-53.143001556396484 58.63800048828125,-52.78499984741211 58.529998779296875,-52.13999938964844"
                    ></path>
                    <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                      <path
                        stroke-linecap="butt"
                        stroke-linejoin="miter"
                        fill-opacity="0"
                        stroke-miterlimit="4"
                        stroke="rgb(240,198,161)"
                        stroke-opacity="1"
                        stroke-width="2"
                        d=" M58.698001861572266,-53.143001556396484 C58.698001861572266,-53.143001556396484 58.63800048828125,-52.78499984741211 58.529998779296875,-52.13999938964844"
                      ></path>
                    </g>
                  </g>
                  <g
                    transform="matrix(-0.32139381766319275,-0.3830222189426422,0.3830222189426422,-0.32139381766319275,427.2203369140625,447.6900329589844)"
                    opacity="1"
                    style={{ display: 'none' }}
                  >
                    <path
                      stroke-linecap="butt"
                      stroke-linejoin="miter"
                      fill-opacity="0"
                      stroke-miterlimit="4"
                      stroke="rgb(240,198,161)"
                      stroke-opacity="1"
                      stroke-width="2"
                      d=" M58.698001861572266,-53.143001556396484 C58.698001861572266,-53.143001556396484 58.63399887084961,-52.75899887084961 58.518001556396484,-52.06800079345703"
                    ></path>
                    <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                      <path
                        stroke-linecap="butt"
                        stroke-linejoin="miter"
                        fill-opacity="0"
                        stroke-miterlimit="4"
                        stroke="rgb(240,198,161)"
                        stroke-opacity="1"
                        stroke-width="2"
                        d=" M58.698001861572266,-53.143001556396484 C58.698001861572266,-53.143001556396484 58.63399887084961,-52.75899887084961 58.518001556396484,-52.06800079345703"
                      ></path>
                    </g>
                  </g>
                  <g
                    transform="matrix(-0.25751903653144836,0.42858365178108215,-0.42858365178108215,-0.25751903653144836,404.7078857421875,234.8253936767578)"
                    opacity="1"
                    style={{ display: 'none' }}
                  >
                    <path
                      stroke-linecap="butt"
                      stroke-linejoin="miter"
                      fill-opacity="0"
                      stroke-miterlimit="4"
                      stroke="rgb(240,198,161)"
                      stroke-opacity="1"
                      stroke-width="2"
                      d=" M67.16300201416016,4.580999851226807 C67.18599700927734,4.7769999504089355 67.1989974975586,4.883999824523926 67.1989974975586,4.883999824523926"
                    ></path>
                    <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                      <path
                        stroke-linecap="butt"
                        stroke-linejoin="miter"
                        fill-opacity="0"
                        stroke-miterlimit="4"
                        stroke="rgb(240,198,161)"
                        stroke-opacity="1"
                        stroke-width="2"
                        d=" M67.16300201416016,4.580999851226807 C67.18599700927734,4.7769999504089355 67.1989974975586,4.883999824523926 67.1989974975586,4.883999824523926"
                      ></path>
                    </g>
                  </g>
                  <g
                    transform="matrix(0.129409521818161,0.4829629063606262,-0.4829629063606262,0.129409521818161,389.2022399902344,206.94290161132812)"
                    opacity="1"
                    style={{ display: 'none' }}
                  >
                    <path
                      stroke-linecap="butt"
                      stroke-linejoin="miter"
                      fill-opacity="0"
                      stroke-miterlimit="4"
                      stroke="rgb(240,198,161)"
                      stroke-opacity="1"
                      stroke-width="2"
                      d=" M62.86199951171875,-9.168000221252441 C62.733001708984375,-8.946000099182129 62.6609992980957,-8.822999954223633 62.6609992980957,-8.822999954223633 M62.86199951171875,-9.168000221252441 C62.733001708984375,-8.946000099182129 62.6609992980957,-8.822999954223633 62.6609992980957,-8.822999954223633"
                    ></path>
                    <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                      <path
                        stroke-linecap="butt"
                        stroke-linejoin="miter"
                        fill-opacity="0"
                        stroke-miterlimit="4"
                        stroke="rgb(240,198,161)"
                        stroke-opacity="1"
                        stroke-width="2"
                        d=" M62.86199951171875,-9.168000221252441 C62.733001708984375,-8.946000099182129 62.6609992980957,-8.822999954223633 62.6609992980957,-8.822999954223633 M62.86199951171875,-9.168000221252441 C62.733001708984375,-8.946000099182129 62.6609992980957,-8.822999954223633 62.6609992980957,-8.822999954223633"
                      ></path>
                    </g>
                  </g>
                  <g
                    transform="matrix(0.129409521818161,0.4829629063606262,-0.4829629063606262,0.129409521818161,398.2022399902344,425.9429016113281)"
                    opacity="1"
                    style={{ display: 'none' }}
                  >
                    <path
                      stroke-linecap="butt"
                      stroke-linejoin="miter"
                      fill-opacity="0"
                      stroke-miterlimit="4"
                      stroke="rgb(240,198,161)"
                      stroke-opacity="1"
                      stroke-width="2"
                      d=" M64.24299621582031,-10.26099967956543 C63.61600112915039,-8.88599967956543 63.2239990234375,-8.024999618530273 63.2239990234375,-8.024999618530273 M64.24299621582031,-10.26099967956543 C63.61600112915039,-8.88599967956543 63.2239990234375,-8.024999618530273 63.2239990234375,-8.024999618530273"
                    ></path>
                    <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                      <path
                        stroke-linecap="butt"
                        stroke-linejoin="miter"
                        fill-opacity="0"
                        stroke-miterlimit="4"
                        stroke="rgb(240,198,161)"
                        stroke-opacity="1"
                        stroke-width="2"
                        d=" M64.24299621582031,-10.26099967956543 C63.61600112915039,-8.88599967956543 63.2239990234375,-8.024999618530273 63.2239990234375,-8.024999618530273 M64.24299621582031,-10.26099967956543 C63.61600112915039,-8.88599967956543 63.2239990234375,-8.024999618530273 63.2239990234375,-8.024999618530273"
                      ></path>
                    </g>
                  </g>
                  <g
                    transform="matrix(0.29389262199401855,0.404508501291275,-0.404508501291275,0.29389262199401855,379.37493896484375,391.32489013671875)"
                    opacity="1"
                    style={{ display: 'none' }}
                  >
                    <path
                      stroke-linecap="butt"
                      stroke-linejoin="miter"
                      fill-opacity="0"
                      stroke-miterlimit="4"
                      stroke="rgb(240,198,161)"
                      stroke-opacity="1"
                      stroke-width="2"
                      d=" M67.01000213623047,3.2750000953674316 C67.12699890136719,4.26800012588501 67.1989974975586,4.883999824523926 67.1989974975586,4.883999824523926"
                    ></path>
                    <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                      <path
                        stroke-linecap="butt"
                        stroke-linejoin="miter"
                        fill-opacity="0"
                        stroke-miterlimit="4"
                        stroke="rgb(240,198,161)"
                        stroke-opacity="1"
                        stroke-width="2"
                        d=" M67.01000213623047,3.2750000953674316 C67.12699890136719,4.26800012588501 67.1989974975586,4.883999824523926 67.1989974975586,4.883999824523926"
                      ></path>
                    </g>
                  </g>
                  <g
                    transform="matrix(-0.0954044982790947,-0.49081358313560486,0.49081358313560486,-0.0954044982790947,438.4661560058594,248.89329528808594)"
                    opacity="1"
                    style={{ display: 'none' }}
                  >
                    <path
                      stroke-linecap="butt"
                      stroke-linejoin="miter"
                      fill-opacity="0"
                      stroke-miterlimit="4"
                      stroke="rgb(240,198,161)"
                      stroke-opacity="1"
                      stroke-width="2"
                      d=" M58.698001861572266,-53.143001556396484 C58.698001861572266,-53.143001556396484 58.698001861572266,-53.143001556396484 58.698001861572266,-53.143001556396484"
                    ></path>
                    <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                      <path
                        stroke-linecap="butt"
                        stroke-linejoin="miter"
                        fill-opacity="0"
                        stroke-miterlimit="4"
                        stroke="rgb(240,198,161)"
                        stroke-opacity="1"
                        stroke-width="2"
                        d=" M58.698001861572266,-53.143001556396484 C58.698001861572266,-53.143001556396484 58.698001861572266,-53.143001556396484 58.698001861572266,-53.143001556396484"
                      ></path>
                    </g>
                  </g>
                  <g
                    transform="matrix(0.16278408467769623,-0.47275927662849426,0.47275927662849426,0.16278408467769623,399.5790100097656,291.39837646484375)"
                    opacity="1"
                    style={{ display: 'none' }}
                  >
                    <path
                      stroke-linecap="butt"
                      stroke-linejoin="miter"
                      fill-opacity="0"
                      stroke-miterlimit="4"
                      stroke="rgb(240,198,161)"
                      stroke-opacity="1"
                      stroke-width="2"
                      d=" M58.52000045776367,-52.07500076293945 C58.176998138427734,-50.02299880981445 57.37900161743164,-45.24300003051758 56.46900177001953,-39.79499816894531"
                    ></path>
                    <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                      <path
                        stroke-linecap="butt"
                        stroke-linejoin="miter"
                        fill-opacity="0"
                        stroke-miterlimit="4"
                        stroke="rgb(240,198,161)"
                        stroke-opacity="1"
                        stroke-width="2"
                        d=" M58.52000045776367,-52.07500076293945 C58.176998138427734,-50.02299880981445 57.37900161743164,-45.24300003051758 56.46900177001953,-39.79499816894531"
                      ></path>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>
        <div className="container-team-design on-about">
          <div className="title-wrapper full-width">
            <h3 className="heading-style-h2 margins">
              Our Awesomic team makes sure that you get an awesome experience
              and cosmic results <span className="span-text-margin">at</span>{' '}
              all times.
            </h3>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="title-wrapper">
          <h3 className="heading-style-h2 center mt-20">Our Values</h3>
        </div>
        <div>
          <div className="lottie-container values">
            <div className="triangle-lottie-wrapper">
              <div
                className="triangle-about-us-lottie"
                data-w-id="0136c6e2-b793-7e80-ff35-36a22d5c0cab"
                data-animation-type="lottie"
                data-src="https://uploads-ssl.webflow.com/602d59da29b66668b8758391/608028a9bac197d7a2ccb6da_DiagramAboutUs.json"
                data-loop="1"
                data-direction="1"
                data-autoplay="1"
                data-is-ix2-target="0"
                data-renderer="svg"
                data-default-duration="2.3333333333333335"
                data-duration="0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 800 720"
                  width="800"
                  height="720"
                  preserveAspectRatio="xMidYMid meet"
                  style={{
                    width: '100%',
                    height: '100%',
                    transform: 'translate3d(0px, 0px, 0px)',
                    contentVisibility: 'visible',
                  }}
                >
                  <defs>
                    <clipPath id="__lottie_element_85">
                      <rect width="800" height="720" x="0" y="0"></rect>
                    </clipPath>
                    <linearGradient
                      id="__lottie_element_92"
                      spreadMethod="pad"
                      gradientUnits="userSpaceOnUse"
                      x1="-177.53799438476562"
                      y1="101.29299926757812"
                      x2="98.91999816894531"
                      y2="-41.37900161743164"
                    >
                      <stop offset="0%" stop-color="rgb(103,108,226)"></stop>
                      <stop offset="50%" stop-color="rgb(172,162,198)"></stop>
                      <stop offset="100%" stop-color="rgb(241,217,170)"></stop>
                    </linearGradient>
                    <linearGradient
                      id="__lottie_element_96"
                      spreadMethod="pad"
                      gradientUnits="userSpaceOnUse"
                      x1="-114.03900146484375"
                      y1="-25.86199951171875"
                      x2="174.51400756835938"
                      y2="107.3280029296875"
                    >
                      <stop offset="0%" stop-color="rgb(241,217,170)"></stop>
                      <stop offset="50%" stop-color="rgb(237,151,141)"></stop>
                      <stop offset="100%" stop-color="rgb(233,86,112)"></stop>
                    </linearGradient>
                    <linearGradient
                      id="__lottie_element_100"
                      spreadMethod="pad"
                      gradientUnits="userSpaceOnUse"
                      x1="0"
                      y1="-200"
                      x2="0"
                      y2="99.56900024414062"
                    >
                      <stop offset="0%" stop-color="rgb(53,235,188)"></stop>
                      <stop offset="50%" stop-color="rgb(147,226,178)"></stop>
                      <stop offset="100%" stop-color="rgb(240,217,169)"></stop>
                    </linearGradient>
                    <linearGradient
                      id="__lottie_element_107"
                      spreadMethod="pad"
                      gradientUnits="userSpaceOnUse"
                      x1="13"
                      y1="-12"
                      x2="-12"
                      y2="13"
                    >
                      <stop offset="0%" stop-color="rgb(53,235,188)"></stop>
                      <stop offset="50%" stop-color="rgb(147,226,178)"></stop>
                      <stop offset="100%" stop-color="rgb(240,217,169)"></stop>
                    </linearGradient>
                    <linearGradient
                      id="__lottie_element_111"
                      spreadMethod="pad"
                      gradientUnits="userSpaceOnUse"
                      x1="2.5380001068115234"
                      y1="-2.5380001068115234"
                      x2="-6.461999893188477"
                      y2="4.961999893188477"
                    >
                      <stop offset="0%" stop-color="rgb(147,226,179)"></stop>
                      <stop offset="50%" stop-color="rgb(240,217,169)"></stop>
                      <stop offset="100%" stop-color="rgb(240,217,169)"></stop>
                    </linearGradient>
                    <linearGradient
                      id="__lottie_element_115"
                      spreadMethod="pad"
                      gradientUnits="userSpaceOnUse"
                      x1="2"
                      y1="-2"
                      x2="-1.5"
                      y2="2"
                    >
                      <stop offset="0%" stop-color="rgb(53,235,188)"></stop>
                      <stop offset="50%" stop-color="rgb(53,235,188)"></stop>
                      <stop offset="100%" stop-color="rgb(53,235,188)"></stop>
                    </linearGradient>
                    <linearGradient
                      id="__lottie_element_122"
                      spreadMethod="pad"
                      gradientUnits="userSpaceOnUse"
                      x1="-14.039999961853027"
                      y1="-27.413000106811523"
                      x2="1.6200000047683716"
                      y2="13.38700008392334"
                    >
                      <stop offset="0%" stop-color="rgb(237,141,137)"></stop>
                      <stop offset="50%" stop-color="rgb(239,176,152)"></stop>
                      <stop offset="100%" stop-color="rgb(241,211,168)"></stop>
                    </linearGradient>
                    <linearGradient
                      id="__lottie_element_126"
                      spreadMethod="pad"
                      gradientUnits="userSpaceOnUse"
                      x1="-9.98799991607666"
                      y1="-12.491000175476074"
                      x2="5.513000011444092"
                      y2="12.508999824523926"
                    >
                      <stop offset="0%" stop-color="rgb(160,152,215)"></stop>
                      <stop offset="50%" stop-color="rgb(124,123,235)"></stop>
                      <stop offset="100%" stop-color="rgb(89,95,254)"></stop>
                    </linearGradient>
                    <linearGradient
                      id="__lottie_element_139"
                      spreadMethod="pad"
                      gradientUnits="userSpaceOnUse"
                      x1="-74.99600219726562"
                      y1="-83.83899688720703"
                      x2="67.03900146484375"
                      y2="71.1259994506836"
                    >
                      <stop offset="0%" stop-color="rgb(40,105,234)"></stop>
                      <stop offset="50%" stop-color="rgb(67,98,232)"></stop>
                      <stop offset="100%" stop-color="rgb(94,92,230)"></stop>
                    </linearGradient>
                  </defs>
                  <g clip-path="url(#__lottie_element_85)">
                    <g
                      transform="matrix(-1,0,0,-1,400,460)"
                      opacity="1"
                      style={{ display: 'block' }}
                    >
                      <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                        <path
                          stroke-linecap="butt"
                          stroke-linejoin="miter"
                          fill-opacity="0"
                          stroke-miterlimit="4"
                          stroke="rgb(241,216,170)"
                          stroke-opacity="1"
                          stroke-width="2"
                          d=" M-2,-196.53590393066406 C-0.8962000012397766,-198.44773864746094 0.8962000012397766,-198.44773864746094 2,-196.53590393066406 C2,-196.53590393066406 171.205078125,96.53589630126953 171.205078125,96.53589630126953 C172.3088836669922,98.44773864746094 171.4126739501953,100 169.205078125,100 C169.205078125,100 -169.205078125,100 -169.205078125,100 C-171.4126739501953,100 -172.3088836669922,98.44773864746094 -171.205078125,96.53589630126953 C-171.205078125,96.53589630126953 -2,-196.53590393066406 -2,-196.53590393066406z"
                        ></path>
                      </g>
                    </g>
                    <g
                      transform="matrix(-1,0,0,1,581.2568359375,562.2568359375)"
                      opacity="1"
                      style={{ display: 'block' }}
                    >
                      <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                        <path
                          stroke="url(#__lottie_element_92)"
                          stroke-linecap="butt"
                          stroke-linejoin="miter"
                          fill-opacity="0"
                          stroke-miterlimit="4"
                          stroke-opacity="1"
                          stroke-width="2"
                          d=" M-2,-196.53590393066406 C-0.8962000012397766,-198.44773864746094 0.8962000012397766,-198.44773864746094 2,-196.53590393066406 C2,-196.53590393066406 171.205078125,96.53589630126953 171.205078125,96.53589630126953 C172.3088836669922,98.44773864746094 171.4126739501953,100 169.205078125,100 C169.205078125,100 -169.205078125,100 -169.205078125,100 C-171.4126739501953,100 -172.3088836669922,98.44773864746094 -171.205078125,96.53589630126953 C-171.205078125,96.53589630126953 -2,-196.53590393066406 -2,-196.53590393066406z"
                        ></path>
                      </g>
                    </g>
                    <g
                      transform="matrix(-1,0,0,1,218.74314880371094,562.2568359375)"
                      opacity="1"
                      style={{ display: 'block' }}
                    >
                      <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                        <path
                          stroke="url(#__lottie_element_96)"
                          stroke-linecap="butt"
                          stroke-linejoin="miter"
                          fill-opacity="0"
                          stroke-miterlimit="4"
                          stroke-opacity="1"
                          stroke-width="2"
                          d=" M-2,-196.53590393066406 C-0.8962000012397766,-198.44773864746094 0.8962000012397766,-198.44773864746094 2,-196.53590393066406 C2,-196.53590393066406 171.205078125,96.53589630126953 171.205078125,96.53589630126953 C172.3088836669922,98.44773864746094 171.4126739501953,100 169.205078125,100 C169.205078125,100 -169.205078125,100 -169.205078125,100 C-171.4126739501953,100 -172.3088836669922,98.44773864746094 -171.205078125,96.53589630126953 C-171.205078125,96.53589630126953 -2,-196.53590393066406 -2,-196.53590393066406z"
                        ></path>
                      </g>
                    </g>
                    <g
                      transform="matrix(1,0,0,1,400,251.6660919189453)"
                      opacity="1"
                      style={{ display: 'block' }}
                    >
                      <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                        <path
                          stroke="url(#__lottie_element_100)"
                          stroke-linecap="butt"
                          stroke-linejoin="miter"
                          fill-opacity="0"
                          stroke-miterlimit="4"
                          stroke-opacity="1"
                          stroke-width="2"
                          d=" M-2,-196.53590393066406 C-0.8962000012397766,-198.44773864746094 0.8962000012397766,-198.44773864746094 2,-196.53590393066406 C2,-196.53590393066406 171.205078125,96.53589630126953 171.205078125,96.53589630126953 C172.3088836669922,98.44773864746094 171.4126739501953,100 169.205078125,100 C169.205078125,100 -169.205078125,100 -169.205078125,100 C-171.4126739501953,100 -172.3088836669922,98.44773864746094 -171.205078125,96.53589630126953 C-171.205078125,96.53589630126953 -2,-196.53590393066406 -2,-196.53590393066406z"
                        ></path>
                      </g>
                    </g>
                    <g
                      transform="matrix(1,0,0,1,400,261.2601013183594)"
                      opacity="1"
                      style={{ display: 'block' }}
                    >
                      <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                        <path
                          fill="rgb(255,255,255)"
                          fill-opacity="1"
                          d=" M51.652000427246094,-5.140999794006348 C52.49100112915039,-5.9070000648498535 53.54800033569336,-6.289000034332275 54.82400131225586,-6.289000034332275 C56.06399917602539,-6.289000034332275 57.084999084472656,-5.9070000648498535 57.887001037597656,-5.140999794006348 C58.68899917602539,-4.4120001792907715 59.19900131225586,-3.371999979019165 59.417999267578125,-2.0230000019073486 C59.417999267578125,-2.0230000019073486 50.066001892089844,-2.0230000019073486 50.066001892089844,-2.0230000019073486 C50.32099914550781,-3.3350000381469727 50.849998474121094,-4.375 51.652000427246094,-5.140999794006348z M51.597999572753906,3.937999963760376 C50.722999572753906,3.0989999771118164 50.194000244140625,1.9500000476837158 50.012001037597656,0.492000013589859 C50.012001037597656,0.492000013589859 62.64500045776367,0.492000013589859 62.64500045776367,0.492000013589859 C62.71799850463867,0.2370000034570694 62.75400161743164,-0.10899999737739563 62.75400161743164,-0.546999990940094 C62.75400161743164,-3.135999917984009 62.02399826049805,-5.196000099182129 60.566001892089844,-6.7270002365112305 C59.14400100708008,-8.258000373840332 57.22999954223633,-9.02299976348877 54.82400131225586,-9.02299976348877 C52.417999267578125,-9.02299976348877 50.46799850463867,-8.239999771118164 48.972999572753906,-6.671999931335449 C47.47800064086914,-5.104000091552734 46.72999954223633,-3.062999963760376 46.72999954223633,-0.546999990940094 C46.72999954223633,1.968999981880188 47.459999084472656,4.010000228881836 48.917999267578125,5.578000068664551 C50.41299819946289,7.145999908447266 52.472999572753906,7.929999828338623 55.097999572753906,7.929999828338623 C56.73899841308594,7.929999828338623 58.141998291015625,7.656000137329102 59.308998107910156,7.109000205993652 C60.512001037597656,6.561999797821045 61.47800064086914,5.8520002365112305 62.207000732421875,4.9770002365112305 C62.207000732421875,4.9770002365112305 59.96500015258789,3.007999897003174 59.96500015258789,3.007999897003174 C58.87099838256836,4.429999828338623 57.249000549316406,5.140999794006348 55.097999572753906,5.140999794006348 C53.67599868774414,5.140999794006348 52.50899887084961,4.739999771118164 51.597999572753906,3.937999963760376z M38.417999267578125,2.8440001010894775 C37.57899856567383,3.7920000553131104 36.430999755859375,4.265999794006348 34.972999572753906,4.265999794006348 C33.55099868774414,4.265999794006348 32.402000427246094,3.7920000553131104 31.527000427246094,2.8440001010894775 C30.687999725341797,1.8960000276565552 30.270000457763672,0.6200000047683716 30.270000457763672,-0.984000027179718 C30.270000457763672,-2.5880000591278076 30.687999725341797,-3.864000082015991 31.527000427246094,-4.811999797821045 C32.402000427246094,-5.760000228881836 33.55099868774414,-6.234000205993652 34.972999572753906,-6.234000205993652 C36.430999755859375,-6.234000205993652 37.57899856567383,-5.760000228881836 38.417999267578125,-4.811999797821045 C39.292999267578125,-3.864000082015991 39.72999954223633,-2.5880000591278076 39.72999954223633,-0.984000027179718 C39.72999954223633,0.6200000047683716 39.292999267578125,1.8960000276565552 38.417999267578125,2.8440001010894775z M42.737998962402344,5.960999965667725 C42.737998962402344,5.960999965667725 42.792999267578125,-8.75 42.792999267578125,-8.75 C42.792999267578125,-8.75 39.94900131225586,-8.75 39.94900131225586,-8.75 C39.94900131225586,-8.75 39.72999954223633,-6.3979997634887695 39.72999954223633,-6.3979997634887695 C39.07400131225586,-7.236999988555908 38.27199935913086,-7.874000072479248 37.32400131225586,-8.312000274658203 C36.375999450683594,-8.78600025177002 35.30099868774414,-9.02299976348877 34.097999572753906,-9.02299976348877 C31.982999801635742,-9.02299976348877 30.250999450683594,-8.276000022888184 28.902000427246094,-6.781000137329102 C27.59000015258789,-5.322999954223633 26.93400001525879,-3.4089999198913574 26.93400001525879,-1.0390000343322754 C26.93400001525879,1.3669999837875366 27.59000015258789,3.299999952316284 28.902000427246094,4.757999897003174 C30.214000701904297,6.216000080108643 31.94700050354004,6.945000171661377 34.097999572753906,6.945000171661377 C36.430999755859375,6.945000171661377 38.29100036621094,6.070000171661377 39.67599868774414,4.320000171661377 C39.67599868774414,4.320000171661377 39.67599868774414,5.906000137329102 39.67599868774414,5.906000137329102 C39.67599868774414,7.328000068664551 39.275001525878906,8.458000183105469 38.472999572753906,9.29699993133545 C37.67100143432617,10.17199993133545 36.41299819946289,10.609000205993652 34.69900131225586,10.609000205993652 C33.641998291015625,10.609000205993652 32.73099899291992,10.46399974822998 31.96500015258789,10.17199993133545 C31.198999404907227,9.880000114440918 30.488000869750977,9.406000137329102 29.832000732421875,8.75 C29.832000732421875,8.75 28.082000732421875,11.04699993133545 28.082000732421875,11.04699993133545 C29.649999618530273,12.614999771118164 31.874000549316406,13.39799976348877 34.75400161743164,13.39799976348877 C37.233001708984375,13.39799976348877 39.18299865722656,12.704999923706055 40.60499954223633,11.319999694824219 C42.027000427246094,9.970999717712402 42.737998962402344,8.1850004196167 42.737998962402344,5.960999965667725z M18.511999130249023,4.1020002365112305 C17.60099983215332,4.868000030517578 16.506000518798828,5.25 15.229999542236328,5.25 C14.390999794006348,5.25 13.736000061035156,5.048999786376953 13.26200008392334,4.6479997634887695 C12.788000106811523,4.247000217437744 12.550999641418457,3.6640000343322754 12.550999641418457,2.8980000019073486 C12.550999641418457,1.9500000476837158 12.897000312805176,1.312000036239624 13.59000015258789,0.984000027179718 C14.319000244140625,0.6190000176429749 15.376999855041504,0.328000009059906 16.761999130249023,0.10899999737739563 C17.490999221801758,0 18.128999710083008,-0.10999999940395355 18.676000595092773,-0.21899999678134918 C19.259000778198242,-0.36500000953674316 19.679000854492188,-0.5289999842643738 19.93400001525879,-0.7110000252723694 C19.93400001525879,-0.7110000252723694 19.93400001525879,1.4220000505447388 19.93400001525879,1.4220000505447388 C19.93400001525879,2.443000078201294 19.459999084472656,3.3359999656677246 18.511999130249023,4.1020002365112305z M24.746000289916992,7.656000137329102 C24.746000289916992,7.656000137329102 24.746000289916992,4.811999797821045 24.746000289916992,4.811999797821045 C24.746000289916992,4.811999797821045 24.145000457763672,4.811999797821045 24.145000457763672,4.811999797821045 C23.45199966430664,4.811999797821045 23.104999542236328,4.466000080108643 23.104999542236328,3.7730000019073486 C23.104999542236328,3.7730000019073486 23.104999542236328,-3.6089999675750732 23.104999542236328,-3.6089999675750732 C23.104999542236328,-5.285999774932861 22.540000915527344,-6.598999977111816 21.40999984741211,-7.546999931335449 C20.280000686645508,-8.531000137329102 18.731000900268555,-9.02299976348877 16.761999130249023,-9.02299976348877 C13.991000175476074,-9.02299976348877 11.621000289916992,-8.093000411987305 9.652000427246094,-6.234000205993652 C9.652000427246094,-6.234000205993652 11.675999641418457,-4.1020002365112305 11.675999641418457,-4.1020002365112305 C12.331999778747559,-4.795000076293945 13.079000473022461,-5.322999954223633 13.918000221252441,-5.688000202178955 C14.793000221252441,-6.089000225067139 15.687000274658203,-6.289000034332275 16.597999572753906,-6.289000034332275 C17.618999481201172,-6.289000034332275 18.43899917602539,-6.089000225067139 19.05900001525879,-5.688000202178955 C19.71500015258789,-5.2870001792907715 20.042999267578125,-4.757999897003174 20.042999267578125,-4.1020002365112305 C20.042999267578125,-3.5190000534057617 19.770000457763672,-3.117000102996826 19.222999572753906,-2.8980000019073486 C18.71299934387207,-2.678999900817871 17.763999938964844,-2.4790000915527344 16.378999710083008,-2.296999931335449 C14.263999938964844,-1.968999981880188 12.550000190734863,-1.4220000505447388 11.23799991607666,-0.656000018119812 C9.961999893188477,0.0729999989271164 9.324000358581543,1.3309999704360962 9.324000358581543,3.117000102996826 C9.324000358581543,4.539000034332275 9.817000389099121,5.705999851226807 10.800999641418457,6.617000102996826 C11.78499984741211,7.492000102996826 13.079999923706055,7.929999828338623 14.684000015258789,7.929999828338623 C15.88700008392334,7.929999828338623 16.999000549316406,7.673999786376953 18.020000457763672,7.164000034332275 C19.041000366210938,6.6539998054504395 19.843000411987305,5.980000019073486 20.426000595092773,5.140999794006348 C20.53499984741211,6.089000225067139 20.82699966430664,6.763000011444092 21.301000595092773,7.164000034332275 C21.81100082397461,7.565000057220459 22.57699966430664,7.765999794006348 23.597999572753906,7.765999794006348 C24.145000457763672,7.765999794006348 24.527000427246094,7.729000091552734 24.746000289916992,7.656000137329102z M8.28499984741211,-8.859000205993652 C7.8470001220703125,-8.968000411987305 7.427999973297119,-9.02299976348877 7.0269999504089355,-9.02299976348877 C5.823999881744385,-9.02299976348877 4.711999893188477,-8.767999649047852 3.690999984741211,-8.258000373840332 C2.7070000171661377,-7.748000144958496 1.9049999713897705,-7.035999774932861 1.284999966621399,-6.125 C1.284999966621399,-6.125 1.065999984741211,-8.75 1.065999984741211,-8.75 C1.065999984741211,-8.75 -1.7769999504089355,-8.75 -1.7769999504089355,-8.75 C-1.7769999504089355,-8.75 -1.7769999504089355,7.656000137329102 -1.7769999504089355,7.656000137329102 C-1.7769999504089355,7.656000137329102 1.503999948501587,7.656000137329102 1.503999948501587,7.656000137329102 C1.503999948501587,7.656000137329102 1.503999948501587,-1.531000018119812 1.503999948501587,-1.531000018119812 C1.503999948501587,-2.8429999351501465 1.9229999780654907,-3.881999969482422 2.76200008392334,-4.6479997634887695 C3.63700008392334,-5.449999809265137 4.749000072479248,-5.8520002365112305 6.0980000495910645,
         -5.8520002365112305 C6.607999801635742,-5.8520002365112305 7.336999893188477,-5.815000057220459 8.28499984741211,-5.742000102996826 C8.28499984741211,-5.742000102996826 8.28499984741211,-8.859000205993652 8.28499984741211,-8.859000205993652z M-6.918000221252441,7.656000137329102 C-6.918000221252441,7.656000137329102 -6.918000221252441,-8.75 -6.918000221252441,-8.75 C-6.918000221252441,-8.75 -10.199000358581543,-8.75 -10.199000358581543,-8.75 C-10.199000358581543,-8.75 -10.199000358581543,0.656000018119812 -10.199000358581543,0.656000018119812 C-10.199000358581543,1.968000054359436 -10.654999732971191,3.0439999103546143 -11.565999984741211,3.882999897003174 C-12.440999984741211,4.7220001220703125 -13.53600025177002,5.140999794006348 -14.847999572753906,5.140999794006348 C-15.977999687194824,5.140999794006348 -16.871000289916992,4.757999897003174 -17.527000427246094,3.992000102996826 C-18.14699935913086,3.2260000705718994 -18.457000732421875,2.1510000228881836 -18.457000732421875,0.765999972820282 C-18.457000732421875,0.765999972820282 -18.457000732421875,-8.75 -18.457000732421875,-8.75 C-18.457000732421875,-8.75 -21.738000869750977,-8.75 -21.738000869750977,-8.75 C-21.738000869750977,-8.75 -21.738000869750977,1.6410000324249268 -21.738000869750977,1.6410000324249268 C-21.738000869750977,3.5 -21.191999435424805,5.013000011444092 -20.097999572753906,6.179999828338623 C-18.968000411987305,7.3470001220703125 -17.527000427246094,7.929999828338623 -15.777000427246094,7.929999828338623 C-14.574000358581543,7.929999828338623 -13.479999542236328,7.673999786376953 -12.496000289916992,7.164000034332275 C-11.475000381469727,6.6539998054504395 -10.63599967956543,5.960999965667725 -9.979999542236328,5.085999965667725 C-9.979999542236328,5.085999965667725 -9.76200008392334,7.656000137329102 -9.76200008392334,7.656000137329102 C-9.76200008392334,7.656000137329102 -6.918000221252441,7.656000137329102 -6.918000221252441,7.656000137329102z M-30.104999542236328,3.6089999675750732 C-31.016000747680664,4.630000114440918 -32.220001220703125,5.140999794006348 -33.71500015258789,5.140999794006348 C-35.209999084472656,5.140999794006348 -36.41299819946289,4.630000114440918 -37.32400131225586,3.6089999675750732 C-38.23500061035156,2.552000045776367 -38.691001892089844,1.1670000553131104 -38.691001892089844,-0.546999990940094 C-38.691001892089844,-2.260999917984009 -38.23500061035156,-3.627000093460083 -37.32400131225586,-4.6479997634887695 C-36.41299819946289,-5.704999923706055 -35.209999084472656,-6.234000205993652 -33.71500015258789,-6.234000205993652 C-32.220001220703125,-6.234000205993652 -31.016000747680664,-5.704999923706055 -30.104999542236328,-4.6479997634887695 C-29.194000244140625,-3.627000093460083 -28.738000869750977,-2.260999917984009 -28.738000869750977,-0.546999990940094 C-28.738000869750977,1.1670000553131104 -29.194000244140625,2.552000045776367 -30.104999542236328,3.6089999675750732z M-39.78499984741211,5.632999897003174 C-38.25400161743164,7.164000034332275 -36.23099899291992,7.929999828338623 -33.71500015258789,7.929999828338623 C-31.236000061035156,7.929999828338623 -29.229999542236328,7.145999908447266 -27.698999404907227,5.578000068664551 C-26.167999267578125,4.010000228881836 -25.402000427246094,1.968999981880188 -25.402000427246094,-0.546999990940094 C-25.402000427246094,-3.0989999771118164 -26.167999267578125,-5.140999794006348 -27.698999404907227,-6.671999931335449 C-29.194000244140625,-8.239999771118164 -31.198999404907227,-9.02299976348877 -33.71500015258789,-9.02299976348877 C-36.194000244140625,-9.02299976348877 -38.19900131225586,-8.239999771118164 -39.72999954223633,-6.671999931335449 C-41.26100158691406,-5.104000091552734 -42.027000427246094,-3.062999963760376 -42.027000427246094,-0.546999990940094 C-42.027000427246094,2.005000114440918 -41.279998779296875,4.065000057220459 -39.78499984741211,5.632999897003174z M-60.07400131225586,5.031000137329102 C-58.250999450683594,6.9629998207092285 -55.845001220703125,7.929999828338623 -52.85499954223633,7.929999828338623 C-50.7400016784668,7.929999828338623 -48.917999267578125,7.401000022888184 -47.387001037597656,6.343999862670898 C-45.85599899291992,5.25 -44.779998779296875,3.736999988555908 -44.15999984741211,1.8049999475479126 C-44.15999984741211,1.8049999475479126 -47.387001037597656,0.656000018119812 -47.387001037597656,0.656000018119812 C-48.18899917602539,3.5 -50.029998779296875,4.921999931335449 -52.90999984741211,4.921999931335449 C-54.84199905395508,4.921999931335449 -56.374000549316406,4.247000217437744 -57.50400161743164,2.8980000019073486 C-58.63399887084961,1.5130000114440918 -59.19900131225586,-0.36399999260902405 -59.19900131225586,-2.7339999675750732 C-59.19900131225586,-5.066999912261963 -58.63399887084961,-6.927000045776367 -57.50400161743164,-8.312000274658203 C-56.33700180053711,-9.696999549865723 -54.805999755859375,-10.390999794006348 -52.90999984741211,-10.390999794006348 C-50.029998779296875,-10.390999794006348 -48.18899917602539,-8.968999862670898 -47.387001037597656,-6.125 C-47.387001037597656,-6.125 -44.15999984741211,-7.2729997634887695 -44.15999984741211,-7.2729997634887695 C-44.74300003051758,-9.241999626159668 -45.80099868774414,-10.755000114440918 -47.332000732421875,-11.812000274658203 C-48.862998962402344,-12.869000434875488 -50.70399856567383,-13.39799976348877 -52.85499954223633,-13.39799976348877 C-54.7869987487793,-13.39799976348877 -56.500999450683594,-12.942000389099121 -57.99599838256836,-12.031000137329102 C-59.49100112915039,-11.156000137329102 -60.65700149536133,-9.89900016784668 -61.49599838256836,-8.258000373840332 C-62.334999084472656,-6.6539998054504395 -62.75400161743164,-4.811999797821045 -62.75400161743164,-2.7339999675750732 C-62.75400161743164,0.5109999775886536 -61.86000061035156,3.0989999771118164 -60.07400131225586,5.031000137329102z"
                        ></path>
                      </g>
                    </g>
                    <g
                      transform="matrix(1,0,0,1,399.5,210.6660919189453)"
                      opacity="1"
                      style={{ display: 'block' }}
                    >
                      <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                        <path
                          stroke="url(#__lottie_element_107)"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          fill-opacity="0"
                          stroke-opacity="1"
                          stroke-width="2"
                          d=" M-4.931000232696533,4.931000232696533 C-6.835999965667725,3.0260000228881836 -9.324999809265137,1.8179999589920044 -12,1.5 C-11.236000061035156,0.17399999499320984 -10.145000457763672,-0.9350000023841858 -8.833000183105469,-1.722000002861023 C-7.520999908447266,-2.509000062942505 -6.03000020980835,-2.9489998817443848 -4.5,-3 C-3.614000082015991,-5.519000053405762 -2.000999927520752,-7.7179999351501465 0.13500000536441803,-9.319999694824219 C2.2709999084472656,-10.92199993133545 4.834000110626221,-11.854999542236328 7.5,-12 C8.692999839782715,-12 9.838000297546387,-11.526000022888184 10.682000160217285,-10.682000160217285 C11.526000022888184,-9.838000297546387 12,-8.692999839782715 12,-7.5 C11.854999542236328,-4.834000110626221 10.92199993133545,-2.2709999084472656 9.319999694824219,-0.13500000536441803 C7.7179999351501465,2.000999927520752 5.519000053405762,3.614000082015991 3,4.5 C2.9489998817443848,6.03000020980835 2.509000062942505,7.520999908447266 1.722000002861023,8.833000183105469 C0.9350000023841858,10.145000457763672 -0.17399999499320984,11.236000061035156 -1.5,12 C-1.8179999589920044,9.324999809265137 -3.0260000228881836,6.835999965667725 -4.931000232696533,4.931000232696533z"
                        ></path>
                      </g>
                    </g>
                    <g
                      transform="matrix(1,0,0,1,391.9620056152344,218.20408630371094)"
                      opacity="1"
                      style={{ display: 'block' }}
                    >
                      <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                        <path
                          stroke="url(#__lottie_element_111)"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          fill-opacity="0"
                          stroke-opacity="1"
                          stroke-width="2"
                          d=" M4.538000106811523,-0.03799999877810478 C3.6570000648498535,1.5230000019073486 2.3289999961853027,2.7860000133514404 0.7250000238418579,3.5880000591278076 C-0.8790000081062317,4.389999866485596 -2.684000015258789,4.693999767303467 -4.461999893188477,4.461999893188477 C-4.693999767303467,2.684000015258789 -4.389999866485596,0.8790000081062317 -3.5880000591278076,-0.7250000238418579 C-2.7860000133514404,-2.3289999961853027 -1.5230000019073486,-3.6570000648498535 0.03799999877810478,-4.538000106811523"
                        ></path>
                      </g>
                    </g>
                    <g
                      transform="matrix(1,0,0,1,404,206.1660919189453)"
                      opacity="1"
                      style={{ display: 'block' }}
                    >
                      <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                        <path
                          stroke="url(#__lottie_element_115)"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          fill-opacity="0"
                          stroke-opacity="1"
                          stroke-width="2"
                          d=" M0,1.5 C0.828000009059906,1.5 1.5,0.828000009059906 1.5,0 C1.5,-0.828000009059906 0.828000009059906,-1.5 0,-1.5 C-0.828000009059906,-1.5 -1.5,-0.828000009059906 -1.5,0 C-1.5,0.828000009059906 -0.828000009059906,1.5 0,1.5z"
                        ></path>
                      </g>
                    </g>
                    <g
                      transform="matrix(1,0,0,1,219.69815063476562,568.40185546875)"
                      opacity="1"
                      style={{ display: 'block' }}
                    >
                      <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                        <path
                          fill="rgb(255,255,255)"
                          fill-opacity="1"
                          d=" M53.64799880981445,-4.073999881744385 C52.55400085449219,-5.241000175476074 51.132999420166016,-5.823999881744385 49.382999420166016,-5.823999881744385 C48.18000030517578,-5.823999881744385 47.06800079345703,-5.568999767303467 46.047000885009766,-5.059000015258789 C45.0629997253418,-4.548999786376953 44.242000579833984,-3.8550000190734863 43.58599853515625,-2.9800000190734863 C43.58599853515625,-2.9800000190734863 43.367000579833984,-5.551000118255615 43.367000579833984,-5.551000118255615 C43.367000579833984,-5.551000118255615 40.52299880981445,-5.551000118255615 40.52299880981445,-5.551000118255615 C40.52299880981445,-5.551000118255615 40.52299880981445,10.854999542236328 40.52299880981445,10.854999542236328 C40.52299880981445,10.854999542236328 43.80500030517578,10.854999542236328 43.80500030517578,10.854999542236328 C43.80500030517578,10.854999542236328 43.80500030517578,1.4490000009536743 43.80500030517578,1.4490000009536743 C43.80500030517578,0.13699999451637268 44.242000579833984,-0.9380000233650208 45.117000579833984,-1.7769999504089355 C46.02799987792969,-2.615999937057495 47.14099884033203,-3.0350000858306885 48.452999114990234,-3.0350000858306885 C49.58300018310547,-3.0350000858306885 50.45800018310547,-2.6530001163482666 51.077999114990234,-1.8869999647140503 C51.73400115966797,-1.121000051498413 52.0620002746582,-0.04500000178813934 52.0620002746582,1.340000033378601 C52.0620002746582,1.340000033378601 52.0620002746582,10.854999542236328 52.0620002746582,10.854999542236328 C52.0620002746582,10.854999542236328 55.34400177001953,10.854999542236328 55.34400177001953,10.854999542236328 C55.34400177001953,10.854999542236328 55.34400177001953,0.4650000035762787 55.34400177001953,0.4650000035762787 C55.34400177001953,-1.3940000534057617 54.77799987792969,-2.9070000648498535 53.64799880981445,-4.073999881744385z M31.882999420166016,6.809000015258789 C30.972000122070312,7.829999923706055 29.76799964904785,8.34000015258789 28.273000717163086,8.34000015258789 C26.777999877929688,8.34000015258789 25.575000762939453,7.829999923706055 24.663999557495117,6.809000015258789 C23.753000259399414,5.751999855041504 23.297000885009766,4.366000175476074 23.297000885009766,2.6519999504089355 C23.297000885009766,0.9380000233650208 23.753000259399414,-0.42800000309944153 24.663999557495117,-1.4490000009536743 C25.575000762939453,-2.50600004196167 26.777999877929688,-3.0350000858306885 28.273000717163086,-3.0350000858306885 C29.76799964904785,-3.0350000858306885 30.972000122070312,-2.50600004196167 31.882999420166016,-1.4490000009536743 C32.79399871826172,-0.42800000309944153 33.25,0.9380000233650208 33.25,2.6519999504089355 C33.25,4.366000175476074 32.79399871826172,5.751999855041504 31.882999420166016,6.809000015258789z M22.202999114990234,8.831999778747559 C23.733999252319336,10.36299991607666 25.756999969482422,11.128999710083008 28.273000717163086,11.128999710083008 C30.75200080871582,11.128999710083008 32.757999420166016,10.345000267028809 34.28900146484375,8.777000427246094 C35.81999969482422,7.209000110626221 36.58599853515625,5.168000221252441 36.58599853515625,2.6519999504089355 C36.58599853515625,0.10000000149011612 35.81999969482422,-1.9420000314712524 34.28900146484375,-3.4730000495910645 C32.79399871826172,-5.040999889373779 30.788999557495117,-5.823999881744385 28.273000717163086,-5.823999881744385 C25.79400062561035,-5.823999881744385 23.788999557495117,-5.040999889373779 22.257999420166016,-3.4730000495910645 C20.726999282836914,-1.9049999713897705 19.961000442504883,0.13600000739097595 19.961000442504883,2.6519999504089355 C19.961000442504883,5.203999996185303 20.70800018310547,7.263999938964844 22.202999114990234,8.831999778747559z M15.913999557495117,-11.128999710083008 C15.913999557495117,-11.128999710083008 12.305000305175781,-11.128999710083008 12.305000305175781,-11.128999710083008 C12.305000305175781,-11.128999710083008 12.305000305175781,-7.8480000495910645 12.305000305175781,-7.8480000495910645 C12.305000305175781,-7.8480000495910645 15.913999557495117,-7.8480000495910645 15.913999557495117,-7.8480000495910645 C15.913999557495117,-7.8480000495910645 15.913999557495117,-11.128999710083008 15.913999557495117,-11.128999710083008z M15.75,-5.551000118255615 C15.75,-5.551000118255615 12.468999862670898,-5.551000118255615 12.468999862670898,-5.551000118255615 C12.468999862670898,-5.551000118255615 12.468999862670898,10.854999542236328 12.468999862670898,10.854999542236328 C12.468999862670898,10.854999542236328 15.75,10.854999542236328 15.75,10.854999542236328 C15.75,10.854999542236328 15.75,-5.551000118255615 15.75,-5.551000118255615z M-5.25,8.61299991607666 C-3.3910000324249268,10.289999961853027 -1.0390000343322754,11.128999710083008 1.8049999475479126,11.128999710083008 C3.8469998836517334,11.128999710083008 5.468999862670898,10.690999984741211 6.671999931335449,9.815999984741211 C7.875,8.904999732971191 8.47700023651123,7.702000141143799 8.47700023651123,6.206999778747559 C8.47700023651123,4.931000232696533 8.003000259399414,3.9110000133514404 7.054999828338623,3.1449999809265137 C6.144000053405762,2.378999948501587 4.557000160217285,1.7039999961853027 2.296999931335449,1.121000051498413 C0.9120000004768372,0.7559999823570251 -0.054999999701976776,0.4099999964237213 -0.6019999980926514,0.0820000022649765 C-1.1119999885559082,-0.2460000067949295 -1.3669999837875366,-0.6660000085830688 -1.3669999837875366,-1.1759999990463257 C-1.3669999837875366,-1.7589999437332153 -1.093999981880188,-2.2149999141693115 -0.546999990940094,-2.5429999828338623 C0.035999998450279236,-2.871000051498413 0.8019999861717224,-3.0350000858306885 1.75,-3.0350000858306885 C3.427000045776367,-3.0350000858306885 4.940000057220459,-2.4700000286102295 6.289000034332275,-1.340000033378601 C6.289000034332275,-1.340000033378601 8.14799976348877,-3.8010001182556152 8.14799976348877,-3.8010001182556152 C6.289000034332275,-5.150000095367432 4.210999965667725,-5.823999881744385 1.9140000343322754,-5.823999881744385 C-0.017999999225139618,-5.823999881744385 -1.5859999656677246,-5.368000030517578 -2.7890000343322754,-4.456999778747559 C-3.9560000896453857,-3.5820000171661377 -4.539000034332275,-2.4149999618530273 -4.539000034332275,-0.9570000171661377 C-4.539000034332275,0.28299999237060547 -4.083000183105469,1.284999966621399 -3.171999931335449,2.0510001182556152 C-2.260999917984009,2.816999912261963 -0.7289999723434448,3.4730000495910645 1.4220000505447388,4.019999980926514 C2.9170000553131104,4.385000228881836 3.937000036239624,4.730999946594238 4.484000205993652,5.059000015258789 C5.031000137329102,5.38700008392334 5.304999828338623,5.823999881744385 5.304999828338623,6.370999813079834 C5.304999828338623,6.991000175476074 4.994999885559082,7.465000152587891 4.375,7.793000221252441 C3.7920000553131104,8.121000289916992 2.9709999561309814,8.28499984741211 1.9140000343322754,8.28499984741211 C-0.2370000034570694,8.28499984741211 -2.0230000019073486,7.611000061035156 -3.444999933242798,6.26200008392334 C-3.444999933242798,6.26200008392334 -5.25,8.61299991607666 -5.25,8.61299991607666z M-20.562000274658203,8.61299991607666 C-18.702999114990234,10.289999961853027 -16.351999282836914,11.128999710083008 -13.508000373840332,11.128999710083008 C-11.465999603271484,11.128999710083008 -9.843999862670898,10.690999984741211 -8.640999794006348,9.815999984741211 C-7.438000202178955,8.904999732971191 -6.835999965667725,7.702000141143799 -6.835999965667725,6.206999778747559 C-6.835999965667725,4.931000232696533 -7.309999942779541,3.9110000133514404 -8.258000373840332,3.1449999809265137 C-9.168999671936035,2.378999948501587 -10.755999565124512,1.7039999961853027 -13.015999794006348,1.121000051498413 C-14.401000022888184,0.7559999823570251 -15.366999626159668,0.4099999964237213 -15.913999557495117,0.0820000022649765 C-16.423999786376953,-0.2460000067949295 -16.68000030517578,-0.6660000085830688 -16.68000030517578,-1.1759999990463257 C-16.68000030517578,-1.7589999437332153 -16.4060001373291,-2.2149999141693115 -15.859000205993652,-2.5429999828338623 C-15.276000022888184,-2.871000051498413 -14.510000228881836,-3.0350000858306885 -13.562000274658203,-3.0350000858306885 C-11.885000228881836,-3.0350000858306885 -10.371999740600586,-2.4700000286102295 -9.02299976348877,-1.340000033378601 C-9.02299976348877,-1.340000033378601 -7.164000034332275,-3.8010001182556152 -7.164000034332275,-3.8010001182556152 C-9.02299976348877,-5.150000095367432 -11.10099983215332,-5.823999881744385 -13.39799976348877,-5.823999881744385 C-15.329999923706055,-5.823999881744385 -16.89900016784668,-5.368000030517578 -18.101999282836914,-4.456999778747559 C-19.268999099731445,-3.5820000171661377 -19.851999282836914,-2.4149999618530273 -19.851999282836914,-0.9570000171661377 C-19.851999282836914,0.28299999237060547 -19.395000457763672,1.284999966621399 -18.483999252319336,2.0510001182556152 C-17.572999954223633,2.816999912261963 -16.04199981689453,3.4730000495910645 -13.890999794006348,4.019999980926514 C-12.395999908447266,4.385000228881836 -11.375,4.730999946594238 -10.82800006866455,5.059000015258789 C-10.281000137329102,5.38700008392334 -10.008000373840332,5.823999881744385 -10.008000373840332,6.370999813079834 C-10.008000373840332,6.991000175476074 -10.317999839782715,7.465000152587891 -10.937999725341797,7.793000221252441 C-11.520999908447266,8.121000289916992 -12.340999603271484,8.28499984741211 -13.39799976348877,8.28499984741211 C-15.548999786376953,8.28499984741211 -17.336000442504883,7.611000061035156 -18.757999420166016,6.26200008392334 C-18.757999420166016,6.26200008392334 -20.562000274658203,8.61299991607666 -20.562000274658203,8.61299991607666z M-28.492000579833984,7.301000118255615 C-29.402999877929688,8.067000389099121 -30.496999740600586,8.449000358581543 -31.773000717163086,8.449000358581543 C-32.61199951171875,8.449000358581543 -33.268001556396484,8.24899959564209 -33.742000579833984,
         7.8480000495910645 C-34.215999603271484,7.447000026702881 -34.452999114990234,6.863999843597412 -34.452999114990234,6.0980000495910645 C-34.452999114990234,5.150000095367432 -34.106998443603516,4.51200008392334 -33.41400146484375,4.184000015258789 C-32.685001373291016,3.819000005722046 -31.62700080871582,3.5280001163482666 -30.242000579833984,3.309000015258789 C-29.51300048828125,3.200000047683716 -28.875,3.0889999866485596 -28.327999114990234,2.9800000190734863 C-27.7450008392334,2.8340001106262207 -27.325000762939453,2.6700000762939453 -27.06999969482422,2.48799991607666 C-27.06999969482422,2.48799991607666 -27.06999969482422,4.620999813079834 -27.06999969482422,4.620999813079834 C-27.06999969482422,5.642000198364258 -27.54400062561035,6.534999847412109 -28.492000579833984,7.301000118255615z M-22.257999420166016,10.854999542236328 C-22.257999420166016,10.854999542236328 -22.257999420166016,8.01200008392334 -22.257999420166016,8.01200008392334 C-22.257999420166016,8.01200008392334 -22.858999252319336,8.01200008392334 -22.858999252319336,8.01200008392334 C-23.552000045776367,8.01200008392334 -23.898000717163086,7.665999889373779 -23.898000717163086,6.9730000495910645 C-23.898000717163086,6.9730000495910645 -23.898000717163086,-0.4099999964237213 -23.898000717163086,-0.4099999964237213 C-23.898000717163086,-2.0869998931884766 -24.464000701904297,-3.4000000953674316 -25.5939998626709,-4.3480000495910645 C-26.724000930786133,-5.331999778747559 -28.273000717163086,-5.823999881744385 -30.242000579833984,-5.823999881744385 C-33.01300048828125,-5.823999881744385 -35.382999420166016,-4.894000053405762 -37.35200119018555,-3.0350000858306885 C-37.35200119018555,-3.0350000858306885 -35.327999114990234,-0.9020000100135803 -35.327999114990234,-0.9020000100135803 C-34.672000885009766,-1.5950000286102295 -33.92499923706055,-2.122999906539917 -33.08599853515625,-2.48799991607666 C-32.21099853515625,-2.8889999389648438 -31.316999435424805,-3.0899999141693115 -30.4060001373291,-3.0899999141693115 C-29.385000228881836,-3.0899999141693115 -28.565000534057617,-2.8889999389648438 -27.94499969482422,-2.48799991607666 C-27.288999557495117,-2.0869998931884766 -26.961000442504883,-1.5579999685287476 -26.961000442504883,-0.9020000100135803 C-26.961000442504883,-0.3190000057220459 -27.233999252319336,0.0820000022649765 -27.7810001373291,0.3009999990463257 C-28.291000366210938,0.5199999809265137 -29.239999771118164,0.7200000286102295 -30.625,0.9020000100135803 C-32.7400016784668,1.2300000190734863 -34.45399856567383,1.7769999504089355 -35.76599884033203,2.5429999828338623 C-37.04199981689453,3.2720000743865967 -37.68000030517578,4.53000020980835 -37.68000030517578,6.315999984741211 C-37.68000030517578,7.73799991607666 -37.1870002746582,8.904999732971191 -36.202999114990234,9.815999984741211 C-35.21900177001953,10.690999984741211 -33.92399978637695,11.128999710083008 -32.31999969482422,11.128999710083008 C-31.117000579833984,11.128999710083008 -30.0049991607666,10.873000144958496 -28.983999252319336,10.36299991607666 C-27.96299934387207,9.852999687194824 -27.160999298095703,9.178999900817871 -26.577999114990234,8.34000015258789 C-26.4689998626709,9.288000106811523 -26.177000045776367,9.961999893188477 -25.702999114990234,10.36299991607666 C-25.19300079345703,10.763999938964844 -24.427000045776367,10.96500015258789 -23.4060001373291,10.96500015258789 C-22.858999252319336,10.96500015258789 -22.476999282836914,10.928000450134277 -22.257999420166016,10.854999542236328z M-43.85900115966797,-0.9020000100135803 C-44.5880012512207,-0.3190000057220459 -45.66400146484375,-0.027000000700354576 -47.08599853515625,-0.027000000700354576 C-47.08599853515625,-0.027000000700354576 -51.89799880981445,-0.027000000700354576 -51.89799880981445,-0.027000000700354576 C-51.89799880981445,-0.027000000700354576 -51.89799880981445,-6.918000221252441 -51.89799880981445,-6.918000221252441 C-51.89799880981445,-6.918000221252441 -47.08599853515625,-6.918000221252441 -47.08599853515625,-6.918000221252441 C-44.20600128173828,-6.918000221252441 -42.76599884033203,-5.769999980926514 -42.76599884033203,-3.4730000495910645 C-42.76599884033203,-2.3429999351501465 -43.130001068115234,-1.4850000143051147 -43.85900115966797,-0.9020000100135803z M-41.28900146484375,-8.175999641418457 C-42.60100173950195,-9.343000411987305 -44.38800048828125,-9.925999641418457 -46.64799880981445,-9.925999641418457 C-46.64799880981445,-9.925999641418457 -55.34400177001953,-9.925999641418457 -55.34400177001953,-9.925999641418457 C-55.34400177001953,-9.925999641418457 -55.34400177001953,10.854999542236328 -55.34400177001953,10.854999542236328 C-55.34400177001953,10.854999542236328 -51.89799880981445,10.854999542236328 -51.89799880981445,10.854999542236328 C-51.89799880981445,10.854999542236328 -51.89799880981445,2.9260001182556152 -51.89799880981445,2.9260001182556152 C-51.89799880981445,2.9260001182556152 -46.64799880981445,2.9260001182556152 -46.64799880981445,2.9260001182556152 C-44.38800048828125,2.9260001182556152 -42.60100173950195,2.359999895095825 -41.28900146484375,1.2300000190734863 C-39.939998626708984,0.06300000101327896 -39.26599884033203,-1.5219999551773071 -39.26599884033203,-3.5269999504089355 C-39.26599884033203,-5.495999813079834 -39.939998626708984,-7.046000003814697 -41.28900146484375,-8.175999641418457z"
                        ></path>
                      </g>
                    </g>
                    <g
                      transform="matrix(1,0,0,1,219.69815063476562,522.5068359375)"
                      opacity="1"
                      style={{ display: 'block' }}
                    >
                      <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                        <path
                          stroke="url(#__lottie_element_122)"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          fill-opacity="0"
                          stroke-opacity="1"
                          stroke-width="2"
                          d=" M-1.5,-12.75 C0,-11.25 3,-5.190000057220459 0,-0.75 C-1.1490000486373901,0.9509999752044678 3,3.25 6,-3.75 C7.415999889373779,-2.1600000858306885 9,1.4520000219345093 9,3.75 C9,6.13700008392334 8.052000045776367,8.425999641418457 6.363999843597412,10.11400032043457 C4.676000118255615,11.802000045776367 2.38700008392334,12.75 0,12.75 C-2.38700008392334,12.75 -4.676000118255615,11.802000045776367 -6.363999843597412,10.11400032043457 C-8.052000045776367,8.425999641418457 -9,6.13700008392334 -9,3.75 C-9,1.1100000143051147 -7.839000225067139,-1.8600000143051147 -6,-3.75 C-4.159999847412109,-5.638999938964844 -1.5,-8.192999839782715 -1.5,-12.75z"
                        ></path>
                      </g>
                    </g>
                    <g
                      transform="matrix(1,0,0,1,581.2568359375,523.2518310546875)"
                      opacity="1"
                      style={{ display: 'block' }}
                    >
                      <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                        <path
                          stroke="url(#__lottie_element_126)"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          fill-opacity="0"
                          stroke-opacity="1"
                          stroke-width="2"
                          d=" M-11.23799991607666,0.8669999837875366 C-11.23799991607666,0.8669999837875366 0.012000000104308128,12.008999824523926 0.012000000104308128,12.008999824523926 C0.012000000104308128,12.008999824523926 11.26200008392334,0.8669999837875366 11.26200008392334,0.8669999837875366 M11.26200008392334,0.8759999871253967 C11.998000144958496,0.15299999713897705 12.57800006866455,-0.7160000205039978 12.96399974822998,-1.6729999780654907 C13.350000381469727,-2.630000114440918 13.532999992370605,-3.6559998989105225 13.503999710083008,-4.688000202178955 C13.475000381469727,-5.71999979019165 13.232000350952148,-6.735000133514404 12.793000221252441,-7.669000148773193 C12.354000091552734,-8.602999687194824 11.72599983215332,-9.435999870300293 10.949999809265137,-10.116000175476074 C10.173999786376953,-10.795999526977539 9.265999794006348,-11.309000015258789 8.281999588012695,-11.621999740600586 C7.297999858856201,-11.9350004196167 6.261000156402588,-12.041000366210938 5.234000205993652,-11.9350004196167 C4.206999778747559,-11.829000473022461 3.2130000591278076,-11.51200008392334 2.315000057220459,-11.003999710083008 C1.4170000553131104,-10.496000289916992 0.6320000290870667,-9.807000160217285 0.012000000104308128,-8.982000350952148 C-0.6060000061988831,-9.812999725341797 -1.3880000114440918,-10.506999969482422 -2.2869999408721924,-11.020999908447266 C-3.186000108718872,-11.53499984741211 -4.181000232696533,-11.855999946594238 -5.210999965667725,-11.965999603271484 C-6.241000175476074,-12.076000213623047 -7.2820000648498535,-11.970999717712402 -8.269000053405762,-11.659000396728516 C-9.255999565124512,-11.347000122070312 -10.168000221252441,-10.833999633789062 -10.946999549865723,-10.152000427246094 C-11.72599983215332,-9.470000267028809 -12.355999946594238,-8.633000373840332 -12.795999526977539,-7.696000099182129 C-13.236000061035156,-6.758999824523926 -13.47700023651123,-5.741000175476074 -13.503999710083008,-4.705999851226807 C-13.531000137329102,-3.6710000038146973 -13.343999862670898,-2.6410000324249268 -12.954000473022461,-1.6820000410079956 C-12.564000129699707,-0.7229999899864197 -11.979999542236328,0.14499999582767487 -11.23799991607666,0.8669999837875366"
                        ></path>
                      </g>
                    </g>
                    <g
                      transform="matrix(1,0,0,1,581.3658447265625,571.8898315429688)"
                      opacity="1"
                      style={{ display: 'block' }}
                    >
                      <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                        <path
                          fill="rgb(255,255,255)"
                          fill-opacity="1"
                          d=" M61.71500015258789,8.722999572753906 C61.71500015258789,8.722999572753906 67.78500366210938,-8.28499984741211 67.78500366210938,-8.28499984741211 C67.78500366210938,-8.28499984741211 64.3949966430664,-8.28499984741211 64.3949966430664,-8.28499984741211 C64.3949966430664,-8.28499984741211 59.90999984741211,5.440999984741211 59.90999984741211,5.440999984741211 C59.90999984741211,5.440999984741211 54.167999267578125,-8.28499984741211 54.167999267578125,-8.28499984741211 C54.167999267578125,-8.28499984741211 50.558998107910156,-8.28499984741211 50.558998107910156,-8.28499984741211 C50.558998107910156,-8.28499984741211 58.27000045776367,9.21500015258789 58.27000045776367,9.21500015258789 C57.650001525878906,10.345000267028809 56.93899917602539,10.90999984741211 56.137001037597656,10.90999984741211 C54.89699935913086,10.90999984741211 54.31399917602539,10.126999855041504 54.387001037597656,8.559000015258789 C54.387001037597656,8.559000015258789 51.37900161743164,9.050999641418457 51.37900161743164,9.050999641418457 C51.37900161743164,10.399999618530273 51.779998779296875,11.529999732971191 52.582000732421875,12.440999984741211 C53.38399887084961,13.388999938964844 54.55099868774414,13.86299991607666 56.082000732421875,13.86299991607666 C57.39400100708008,13.86299991607666 58.525001525878906,13.388999938964844 59.472999572753906,12.440999984741211 C60.42100143432617,11.529999732971191 61.167999267578125,10.291000366210938 61.71500015258789,8.722999572753906z M44.37900161743164,3.1449999809265137 C44.37900161743164,3.1449999809265137 44.37900161743164,-5.495999813079834 44.37900161743164,-5.495999813079834 C44.37900161743164,-5.495999813079834 49.40999984741211,-5.495999813079834 49.40999984741211,-5.495999813079834 C49.40999984741211,-5.495999813079834 49.40999984741211,-8.28499984741211 49.40999984741211,-8.28499984741211 C49.40999984741211,-8.28499984741211 44.37900161743164,-8.28499984741211 44.37900161743164,-8.28499984741211 C44.37900161743164,-8.28499984741211 44.37900161743164,-12.65999984741211 44.37900161743164,-12.65999984741211 C44.37900161743164,-12.65999984741211 41.53499984741211,-12.65999984741211 41.53499984741211,-12.65999984741211 C41.53499984741211,-12.65999984741211 41.097999572753906,-8.28499984741211 41.097999572753906,-8.28499984741211 C41.097999572753906,-8.28499984741211 37.87099838256836,-8.28499984741211 37.87099838256836,-8.28499984741211 C37.87099838256836,-8.28499984741211 37.87099838256836,-5.495999813079834 37.87099838256836,-5.495999813079834 C37.87099838256836,-5.495999813079834 41.097999572753906,-5.495999813079834 41.097999572753906,-5.495999813079834 C41.097999572753906,-5.495999813079834 41.097999572753906,3.8010001182556152 41.097999572753906,3.8010001182556152 C41.097999572753906,5.296000003814697 41.51599884033203,6.443999767303467 42.35499954223633,7.245999813079834 C43.22999954223633,8.01200008392334 44.470001220703125,8.395000457763672 46.07400131225586,8.395000457763672 C47.277000427246094,8.395000457763672 48.388999938964844,8.267000198364258 49.40999984741211,8.01200008392334 C49.40999984741211,8.01200008392334 49.40999984741211,5.004000186920166 49.40999984741211,5.004000186920166 C48.53499984741211,5.2230000495910645 47.64099884033203,5.331999778747559 46.72999954223633,5.331999778747559 C45.89099884033203,5.331999778747559 45.29100036621094,5.168000221252441 44.92599868774414,4.840000152587891 C44.56100082397461,4.51200008392334 44.37900161743164,3.947000026702881 44.37900161743164,3.1449999809265137z M34.47999954223633,-13.86299991607666 C34.47999954223633,-13.86299991607666 30.871000289916992,-13.86299991607666 30.871000289916992,-13.86299991607666 C30.871000289916992,-13.86299991607666 30.871000289916992,-10.581999778747559 30.871000289916992,-10.581999778747559 C30.871000289916992,-10.581999778747559 34.47999954223633,-10.581999778747559 34.47999954223633,-10.581999778747559 C34.47999954223633,-10.581999778747559 34.47999954223633,-13.86299991607666 34.47999954223633,-13.86299991607666z M34.316001892089844,-8.28499984741211 C34.316001892089844,-8.28499984741211 31.03499984741211,-8.28499984741211 31.03499984741211,-8.28499984741211 C31.03499984741211,-8.28499984741211 31.03499984741211,8.121000289916992 31.03499984741211,8.121000289916992 C31.03499984741211,8.121000289916992 34.316001892089844,8.121000289916992 34.316001892089844,8.121000289916992 C34.316001892089844,8.121000289916992 34.316001892089844,-8.28499984741211 34.316001892089844,-8.28499984741211z M27.645000457763672,-8.395000457763672 C27.207000732421875,-8.503999710083008 26.788000106811523,-8.559000015258789 26.386999130249023,-8.559000015258789 C25.18400001525879,-8.559000015258789 24.07200050354004,-8.303000450134277 23.051000595092773,-7.793000221252441 C22.066999435424805,-7.2829999923706055 21.264999389648438,-6.571000099182129 20.645000457763672,-5.659999847412109 C20.645000457763672,-5.659999847412109 20.426000595092773,-8.28499984741211 20.426000595092773,-8.28499984741211 C20.426000595092773,-8.28499984741211 17.582000732421875,-8.28499984741211 17.582000732421875,-8.28499984741211 C17.582000732421875,-8.28499984741211 17.582000732421875,8.121000289916992 17.582000732421875,8.121000289916992 C17.582000732421875,8.121000289916992 20.863000869750977,8.121000289916992 20.863000869750977,8.121000289916992 C20.863000869750977,8.121000289916992 20.863000869750977,-1.065999984741211 20.863000869750977,-1.065999984741211 C20.863000869750977,-2.378000020980835 21.281999588012695,-3.4179999828338623 22.121000289916992,-4.184000015258789 C22.996000289916992,-4.986000061035156 24.107999801635742,-5.38700008392334 25.457000732421875,-5.38700008392334 C25.966999053955078,-5.38700008392334 26.69700050354004,-5.349999904632568 27.645000457763672,-5.2769999504089355 C27.645000457763672,-5.2769999504089355 27.645000457763672,-8.395000457763672 27.645000457763672,-8.395000457763672z M2.6519999504089355,-4.676000118255615 C3.490999937057495,-5.441999912261963 4.547999858856201,-5.823999881744385 5.823999881744385,-5.823999881744385 C7.064000129699707,-5.823999881744385 8.085000038146973,-5.441999912261963 8.88700008392334,-4.676000118255615 C9.689000129699707,-3.947000026702881 10.199000358581543,-2.9079999923706055 10.418000221252441,-1.559000015258789 C10.418000221252441,-1.559000015258789 1.065999984741211,-1.559000015258789 1.065999984741211,-1.559000015258789 C1.3209999799728394,-2.871000051498413 1.850000023841858,-3.9100000858306885 2.6519999504089355,-4.676000118255615z M2.5980000495910645,4.4019999504089355 C1.7230000495910645,3.562999963760376 1.194000005722046,2.4149999618530273 1.0119999647140503,0.9570000171661377 C1.0119999647140503,0.9570000171661377 13.645000457763672,0.9570000171661377 13.645000457763672,0.9570000171661377 C13.718000411987305,0.7020000219345093 13.753999710083008,0.35600000619888306 13.753999710083008,-0.0820000022649765 C13.753999710083008,-2.6710000038146973 13.02400016784668,-4.730999946594238 11.565999984741211,-6.26200008392334 C10.144000053405762,-7.793000221252441 8.229999542236328,-8.559000015258789 5.823999881744385,-8.559000015258789 C3.4179999828338623,-8.559000015258789 1.468000054359436,-7.775000095367432 -0.027000000700354576,-6.206999778747559 C-1.5219999551773071,-4.638999938964844 -2.2699999809265137,-2.5980000495910645 -2.2699999809265137,-0.0820000022649765 C-2.2699999809265137,2.434000015258789 -1.5399999618530273,4.474999904632568 -0.0820000022649765,6.043000221252441 C1.4129999876022339,7.611000061035156 3.4730000495910645,8.395000457763672 6.0980000495910645,8.395000457763672 C7.738999843597412,8.395000457763672 9.142000198364258,8.121000289916992 10.309000015258789,7.573999881744385 C11.51200008392334,7.0269999504089355 12.477999687194824,6.315999984741211 13.206999778747559,5.440999984741211 C13.206999778747559,5.440999984741211 10.96500015258789,3.4730000495910645 10.96500015258789,3.4730000495910645 C9.871000289916992,4.894999980926514 8.24899959564209,5.605000019073486 6.0980000495910645,5.605000019073486 C4.676000118255615,5.605000019073486 3.509000062942505,5.203999996185303 2.5980000495910645,4.4019999504089355z M-17.582000732421875,6.043000221252441 C-16.051000595092773,7.611000061035156 -14.064000129699707,8.395000457763672 -11.621000289916992,8.395000457763672 C-9.835000038146973,8.395000457763672 -8.28499984741211,7.956999778747559 -6.9730000495910645,7.081999778747559 C-5.660999774932861,6.206999778747559 -4.767000198364258,5.004000186920166 -4.293000221252441,3.4730000495910645 C-4.293000221252441,3.4730000495910645 -7.409999847412109,2.48799991607666 -7.409999847412109,2.48799991607666 C-7.775000095367432,3.4719998836517334 -8.321999549865723,4.23799991607666 -9.050999641418457,4.784999847412109 C-9.779999732971191,5.331999778747559 -10.63700008392334,5.605000019073486 -11.621000289916992,5.605000019073486 C-13.116000175476074,5.605000019073486 -14.300999641418457,5.09499979019165 -15.175999641418457,4.073999881744385 C-16.051000595092773,3.0169999599456787 -16.488000869750977,1.6319999694824219 -16.488000869750977,-0.0820000022649765 C-16.488000869750977,-1.7960000038146973 -16.051000595092773,-3.1630001068115234 -15.175999641418457,-4.184000015258789 C-14.300999641418457,-5.241000175476074 -13.116000175476074,-5.769999980926514 -11.621000289916992,-5.769999980926514 C-10.63700008392334,-5.769999980926514 -9.779999732971191,-5.495999813079834 -9.050999641418457,-4.948999881744385 C-8.321999549865723,-4.4019999504089355 -7.775000095367432,-3.635999917984009 -7.409999847412109,-2.6519999504089355 C-7.409999847412109,-2.6519999504089355 -4.293000221252441,-3.63700008392334 -4.293000221252441,-3.63700008392334 C-4.767000198364258,-5.168000221252441 -5.660999774932861,-6.370999813079834 -6.9730000495910645,-7.245999813079834 C-8.28499984741211,-8.121000289916992 -9.835000038146973,-8.559000015258789 -11.621000289916992,-8.559000015258789 C-14.064000129699707,
         -8.559000015258789 -16.051000595092773,-7.775000095367432 -17.582000732421875,-6.206999778747559 C-19.07699966430664,-4.638999938964844 -19.823999404907227,-2.5980000495910645 -19.823999404907227,-0.0820000022649765 C-19.823999404907227,2.434000015258789 -19.07699966430664,4.474999904632568 -17.582000732421875,6.043000221252441z M-25.18400001525879,-6.809000015258789 C-26.277999877929688,-7.97599983215332 -27.698999404907227,-8.559000015258789 -29.448999404907227,-8.559000015258789 C-30.652000427246094,-8.559000015258789 -31.763999938964844,-8.303000450134277 -32.78499984741211,-7.793000221252441 C-33.76900100708008,-7.2829999923706055 -34.59000015258789,-6.590000152587891 -35.24599838256836,-5.715000152587891 C-35.24599838256836,-5.715000152587891 -35.46500015258789,-8.28499984741211 -35.46500015258789,-8.28499984741211 C-35.46500015258789,-8.28499984741211 -38.308998107910156,-8.28499984741211 -38.308998107910156,-8.28499984741211 C-38.308998107910156,-8.28499984741211 -38.308998107910156,8.121000289916992 -38.308998107910156,8.121000289916992 C-38.308998107910156,8.121000289916992 -35.027000427246094,8.121000289916992 -35.027000427246094,8.121000289916992 C-35.027000427246094,8.121000289916992 -35.027000427246094,-1.284999966621399 -35.027000427246094,-1.284999966621399 C-35.027000427246094,-2.5969998836517334 -34.59000015258789,-3.6730000972747803 -33.71500015258789,-4.51200008392334 C-32.80400085449219,-5.35099983215332 -31.69099998474121,-5.769999980926514 -30.378999710083008,-5.769999980926514 C-29.249000549316406,-5.769999980926514 -28.374000549316406,-5.38700008392334 -27.753999710083008,-4.620999813079834 C-27.097999572753906,-3.8550000190734863 -26.770000457763672,-2.7799999713897705 -26.770000457763672,-1.3949999809265137 C-26.770000457763672,-1.3949999809265137 -26.770000457763672,8.121000289916992 -26.770000457763672,8.121000289916992 C-26.770000457763672,8.121000289916992 -23.488000869750977,8.121000289916992 -23.488000869750977,8.121000289916992 C-23.488000869750977,8.121000289916992 -23.488000869750977,-2.2699999809265137 -23.488000869750977,-2.2699999809265137 C-23.488000869750977,-4.129000186920166 -24.054000854492188,-5.642000198364258 -25.18400001525879,-6.809000015258789z M-43.558998107910156,-13.86299991607666 C-43.558998107910156,-13.86299991607666 -47.167999267578125,-13.86299991607666 -47.167999267578125,-13.86299991607666 C-47.167999267578125,-13.86299991607666 -47.167999267578125,-10.581999778747559 -47.167999267578125,-10.581999778747559 C-47.167999267578125,-10.581999778747559 -43.558998107910156,-10.581999778747559 -43.558998107910156,-10.581999778747559 C-43.558998107910156,-10.581999778747559 -43.558998107910156,-13.86299991607666 -43.558998107910156,-13.86299991607666z M-43.722999572753906,-8.28499984741211 C-43.722999572753906,-8.28499984741211 -47.00400161743164,-8.28499984741211 -47.00400161743164,-8.28499984741211 C-47.00400161743164,-8.28499984741211 -47.00400161743164,8.121000289916992 -47.00400161743164,8.121000289916992 C-47.00400161743164,8.121000289916992 -43.722999572753906,8.121000289916992 -43.722999572753906,8.121000289916992 C-43.722999572753906,8.121000289916992 -43.722999572753906,-8.28499984741211 -43.722999572753906,-8.28499984741211z M-64.06600189208984,7.629000186920166 C-62.608001708984375,8.138999938964844 -61.058998107910156,8.395000457763672 -59.417999267578125,8.395000457763672 C-56.86600112915039,8.395000457763672 -54.86000061035156,7.8480000495910645 -53.402000427246094,6.754000186920166 C-51.90700149536133,5.624000072479248 -51.15999984741211,4.0920000076293945 -51.15999984741211,2.1600000858306885 C-51.15999984741211,0.5189999938011169 -51.779998779296875,-0.7379999756813049 -53.02000045776367,-1.6130000352859497 C-54.222999572753906,-2.5239999294281006 -56.099998474121094,-3.309000015258789 -58.652000427246094,-3.9649999141693115 C-60.474998474121094,-4.439000129699707 -61.750999450683594,-4.894000053405762 -62.47999954223633,-5.331999778747559 C-63.20899963378906,-5.806000232696533 -63.57400131225586,-6.425000190734863 -63.57400131225586,-7.190999984741211 C-63.57400131225586,-8.029999732971191 -63.19200134277344,-8.685999870300293 -62.42599868774414,-9.15999984741211 C-61.65999984741211,-9.670000076293945 -60.638999938964844,-9.925999641418457 -59.362998962402344,-9.925999641418457 C-57.17499923706055,-9.925999641418457 -55.24300003051758,-9.232999801635742 -53.566001892089844,-7.8480000495910645 C-53.566001892089844,-7.8480000495910645 -51.652000427246094,-10.472999572753906 -51.652000427246094,-10.472999572753906 C-53.766998291015625,-12.11400032043457 -56.26499938964844,-12.934000015258789 -59.14500045776367,-12.934000015258789 C-61.51499938964844,-12.934000015258789 -63.42900085449219,-12.38700008392334 -64.88700103759766,-11.293000221252441 C-66.30899810791016,-10.236000061035156 -67.0199966430664,-8.812999725341797 -67.0199966430664,-7.0269999504089355 C-67.0199966430664,-5.7870001792907715 -66.6729965209961,-4.767000198364258 -65.9800033569336,-3.9649999141693115 C-65.28700256347656,-3.1630001068115234 -64.43099975585938,-2.5250000953674316 -63.40999984741211,-2.0510001182556152 C-62.35300064086914,-1.6130000352859497 -60.986000061035156,-1.1579999923706055 -59.308998107910156,-0.6840000152587891 C-57.52299880981445,-0.17399999499320984 -56.30099868774414,0.30000001192092896 -55.64500045776367,0.7379999756813049 C-54.95199966430664,1.1759999990463257 -54.60499954223633,1.7589999437332153 -54.60499954223633,2.48799991607666 C-54.60499954223633,3.3989999294281006 -55.00699996948242,4.111000061035156 -55.808998107910156,4.620999813079834 C-56.611000061035156,5.13100004196167 -57.722999572753906,5.38700008392334 -59.14500045776367,5.38700008392334 C-60.3849983215332,5.38700008392334 -61.58700180053711,5.168000221252441 -62.75400161743164,4.730000019073486 C-63.88399887084961,4.25600004196167 -64.88700103759766,3.6010000705718994 -65.76200103759766,2.76200008392334 C-65.76200103759766,2.76200008392334 -67.78500366210938,5.38700008392334 -67.78500366210938,5.38700008392334 C-66.72799682617188,6.370999813079834 -65.48799896240234,7.11899995803833 -64.06600189208984,7.629000186920166z"
                        ></path>
                      </g>
                    </g>
                    <g
                      transform="matrix(0.15000000596046448,0,0,0.15000000596046448,331.9750061035156,399.3370056152344)"
                      opacity="1"
                      style={{ display: 'block' }}
                    >
                      <g
                        opacity="1"
                        transform="matrix(1,0,0,1,450.1659851074219,586.9550170898438)"
                      >
                        <path
                          stroke-linecap="butt"
                          stroke-linejoin="miter"
                          fill-opacity="0"
                          stroke-miterlimit="10"
                          stroke="rgb(255,255,255)"
                          stroke-opacity="1"
                          stroke-width="90"
                          d=" M203.3933563232422,-147.3419952392578 C228.74935913085938,-48.74700164794922 206.0581512451172,43.45671081542969 157.8761444091797,93.36670684814453 C116.45714569091797,134.88571166992188 63.882999420166016,160.34164428710938 0.4000000059604645,160.34164428710938 C0.4000000059604645,160.34164428710938 0,160.34164428710938 0,160.34164428710938 C0,160.34164428710938 -0.4000000059604645,160.34164428710938 -0.4000000059604645,160.34164428710938 C-63.882999420166016,160.34164428710938 -116.45614624023438,134.88571166992188 -157.87513732910156,93.36670684814453 C-206.0581512451172,43.45671081542969 -228.74935913085938,-48.74700164794922 -203.3933563232422,-147.3419952392578"
                        ></path>
                      </g>
                    </g>
                    <g
                      transform="matrix(0.15000000596046448,0,0,0.15000000596046448,333.7834167480469,397.2574157714844)"
                      opacity="1"
                      style={{ display: 'block' }}
                    >
                      <g
                        opacity="1"
                        transform="matrix(1,0,0,1,318.27301025390625,252.70599365234375)"
                      >
                        <path
                          fill="rgb(255,134,134)"
                          fill-opacity="1"
                          d=" M-87.15799713134766,-12.465999603271484 C-87.15799713134766,-12.465999603271484 87.15799713134766,-12.465999603271484 87.15799713134766,-12.465999603271484 C87.15799713134766,-12.465999603271484 87.15799713134766,12.465999603271484 87.15799713134766,12.465999603271484 C87.15799713134766,12.465999603271484 -87.15799713134766,12.465999603271484 -87.15799713134766,12.465999603271484 C-87.15799713134766,12.465999603271484 -87.15799713134766,-12.465999603271484 -87.15799713134766,-12.465999603271484z"
                        ></path>
                      </g>
                      <g
                        opacity="1"
                        transform="matrix(1,0,0,1,318.27398681640625,252.70599365234375)"
                      >
                        <path
                          fill="rgb(255,134,134)"
                          fill-opacity="1"
                          d=" M52.814998626708984,-70.44499969482422 C52.814998626708984,-70.44499969482422 70.44400024414062,-52.814998626708984 70.44400024414062,-52.814998626708984 C70.44400024414062,-52.814998626708984 -52.814998626708984,70.44499969482422 -52.814998626708984,70.44499969482422 C-52.814998626708984,70.44499969482422 -70.44400024414062,52.814998626708984 -70.44400024414062,52.814998626708984 C-70.44400024414062,52.814998626708984 52.814998626708984,-70.44499969482422 52.814998626708984,-70.44499969482422z"
                        ></path>
                      </g>
                      <g
                        opacity="1"
                        transform="matrix(1,0,0,1,318.27398681640625,252.70700073242188)"
                      >
                        <path
                          fill="rgb(255,134,134)"
                          fill-opacity="1"
                          d=" M12.465999603271484,87.15799713134766 C12.465999603271484,87.15799713134766 -12.465999603271484,87.15799713134766 -12.465999603271484,87.15799713134766 C-12.465999603271484,87.15799713134766 -12.465999603271484,-87.15799713134766 -12.465999603271484,-87.15799713134766 C-12.465999603271484,-87.15799713134766 12.465999603271484,-87.15799713134766 12.465999603271484,-87.15799713134766 C12.465999603271484,-87.15799713134766 12.465999603271484,87.15799713134766 12.465999603271484,87.15799713134766z"
                        ></path>
                      </g>
                      <g
                        opacity="1"
                        transform="matrix(1,0,0,1,318.27398681640625,252.70599365234375)"
                      >
                        <path
                          fill="rgb(255,134,134)"
                          fill-opacity="1"
                          d=" M-70.44499969482422,-52.814998626708984 C-70.44499969482422,-52.814998626708984 -52.816001892089844,-70.44400024414062 -52.816001892089844,-70.44400024414062 C-52.816001892089844,-70.44400024414062 70.44400024414062,52.814998626708984 70.44400024414062,52.814998626708984 C70.44400024414062,52.814998626708984 52.81399917602539,70.44400024414062 52.81399917602539,70.44400024414062 C52.81399917602539,70.44400024414062 -70.44499969482422,-52.814998626708984 -70.44499969482422,-52.814998626708984z"
                        ></path>
                      </g>
                    </g>
                    <g
                      transform="matrix(0.15000000596046448,0,0,0.15000000596046448,333.78326416015625,397.2574157714844)"
                      opacity="1"
                      style={{ display: 'block' }}
                    >
                      <g
                        opacity="1"
                        transform="matrix(1,0,0,1,586.5040283203125,250.10299682617188)"
                      >
                        <path
                          fill="url(#__lottie_element_139)"
                          fill-opacity="1"
                          d=" M0,-82.37999725341797 C45.49800109863281,-82.37999725341797 82.37999725341797,-45.49700164794922 82.37999725341797,0 C82.37999725341797,45.49800109863281 45.49800109863281,82.37999725341797 0,82.37999725341797 C-45.49700164794922,82.37999725341797 -82.37999725341797,45.49800109863281 -82.37999725341797,0 C-82.37999725341797,-45.49700164794922 -45.49700164794922,-82.37999725341797 0,-82.37999725341797z"
                        ></path>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
            <div className="statistics-container about">
              <div className="statistics-figures about-page">
                <div className="statistics-number about">
                  <div className="about-figure">1</div>
                </div>
                <div className="text-statistic">
                  <div className="down-text">
                    <p className="body-text-l">
                      Enthusiastic
                      <br />
                      and <strong className="h6">devoted</strong>
                    </p>
                  </div>
                </div>
                <div className="divider-about"></div>
              </div>
              <div className="statistics-figures about-page">
                <div className="statistics-number about">
                  <div className="about-figure">2</div>
                </div>
                <div className="text-statistic">
                  <div className="down-text">
                    <p className="body-text-l">
                      <strong className="h6">Brave</strong>
                      to express
                      <br />
                      ourselves
                    </p>
                  </div>
                </div>
                <div className="divider-about"></div>
              </div>
              <div className="statistics-figures last">
                <div className="statistics-number about">
                  <div className="about-figure">3</div>
                </div>
                <div className="text-statistic">
                  <div className="down-text">
                    <p className="body-text-l">
                      <strong className="h6">Sincere</strong>
                      &amp;
                      <br />
                      straightforward
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="dog_wrapper">
        <Image
          src="svg/dog.svg"
          loading="lazy"
          width="295"
          height="228"
          alt="ovioo dog"
          className="ovioo-dog"
        />
      </div>
    </>
  );
}
