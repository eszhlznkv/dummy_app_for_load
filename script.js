import http from 'k6/http';
import { sleep, check } from 'k6';
import { group } from 'k6';


//ALL URL RPS = 10 
//VU = (Request Rate * T) / R →

//VU = (10 * 2) / 1 = 20

export let options = {
  vus: 20,
  duration: '60s'
};

export default function() {
  const before = new Date().getTime();
  const T = 2;



    let userDistro = Math.floor(Math.random() * 100);

    switch (true) {
      case (userDistro <= 33):
        group('GET_/', function() {
            http.get('http://${__ENV.MY_HOSTNAME}:49160');
          });
          console.log(`get request`)
        break;

      case (userDistro > 33 && userDistro <= 66):
        //http.get('http://localhost:49160/secret');
        
        group('GET_/secret', function() {
            http.get('http://${__ENV.MY_HOSTNAME}/secret');
          });
          console.log(`get request secret`)
        break;

      case (userDistro > 66 && userDistro < 100):
        //http.post('http://localhost:49160');
        group('POST_/', function() {
            http.post('http://${__ENV.MY_HOSTNAME}:49160');
          });

          console.log(`post request`)

        break;
    //   default:
    //     http.get("http://test.loadimpact.com?switch=default");
    //     break;
    }

  const after = new Date().getTime();
  const diff = (after - before) / 10;
  const remainder = T - diff;

  check(remainder, { 'reached request rate': remainder > 0 });
  if (remainder > 0) {
    sleep(remainder);
  } else {
    console.warn(
      `Timer exhausted! The execution time of the test took longer than ${T} seconds`
    );
  }



}
