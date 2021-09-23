import './App.css';
import React from 'react'
import { radvizMapper, Radviz } from './lib/index.js';

function App() {

  const labelAngles = {
    "white_ratio": 0,
    "age_median": 120,
    "income_per_capita": 240
  }

  const labelMapping = {
    "white_ratio": 'white ratio',
    "age_median": 'age median',
    "income_per_capita": 'income per capita',
  }


  let data = [
    {
      "county_name": "Albany County",
      "age_median": 37.8,
      "white_ratio": 0.7674294613,
      "income_per_capita": 19258333
    },
    {
      "county_name": "Allegany County",
      "age_median": 39.0,
      "white_ratio": 0.956530057,
      "income_per_capita": 1666839
    },
    {
      "county_name": "Bronx County",
      "age_median": 33.9,
      "white_ratio": 0.4506441007,
      "income_per_capita": 56318621
    },
    {
      "county_name": "Broome County",
      "age_median": 39.7,
      "white_ratio": 0.8668880914,
      "income_per_capita": 8831155
    },
    {
      "county_name": "Cattaraugus County",
      "age_median": 41.8,
      "white_ratio": 0.9222874656,
      "income_per_capita": 3179730
    },
    {
      "county_name": "Cayuga County",
      "age_median": 42.8,
      "white_ratio": 0.9242989932,
      "income_per_capita": 3409137
    },
    {
      "county_name": "Chautauqua County",
      "age_median": 42.5,
      "white_ratio": 0.9387489745,
      "income_per_capita": 5375002
    },
    {
      "county_name": "Chemung County",
      "age_median": 41.4,
      "white_ratio": 0.8861800009,
      "income_per_capita": 3874102
    },
    {
      "county_name": "Chenango County",
      "age_median": 44.6,
      "white_ratio": 0.9668839905,
      "income_per_capita": 2083995
    },
    {
      "county_name": "Clinton County",
      "age_median": 40.0,
      "white_ratio": 0.9231304348,
      "income_per_capita": 3630851
    },
    {
      "county_name": "Columbia County",
      "age_median": 47.8,
      "white_ratio": 0.9060244925,
      "income_per_capita": 3456043
    },
    {
      "county_name": "Cortland County",
      "age_median": 36.2,
      "white_ratio": 0.9498486904,
      "income_per_capita": 2010388
    },
    {
      "county_name": "Delaware County",
      "age_median": 47.7,
      "white_ratio": 0.954045778,
      "income_per_capita": 1863398
    },
    {
      "county_name": "Dutchess County",
      "age_median": 42.2,
      "white_ratio": 0.8187005382,
      "income_per_capita": 17205154
    },
    {
      "county_name": "Erie County",
      "age_median": 40.3,
      "white_ratio": 0.7995347663,
      "income_per_capita": 49148494
    },
    {
      "county_name": "Essex County",
      "age_median": 47.3,
      "white_ratio": 0.9445462026,
      "income_per_capita": 1777164
    },
    {
      "county_name": "Franklin County",
      "age_median": 40.0,
      "white_ratio": 0.8358489458,
      "income_per_capita": 1983300
    },
    {
      "county_name": "Fulton County",
      "age_median": 43.7,
      "white_ratio": 0.9543368774,
      "income_per_capita": 2426755
    },
    {
      "county_name": "Genesee County",
      "age_median": 43.1,
      "white_ratio": 0.9318428628,
      "income_per_capita": 2645232
    },
    {
      "county_name": "Greene County",
      "age_median": 46.2,
      "white_ratio": 0.9014401819,
      "income_per_capita": 2316947
    },
    {
      "county_name": "Hamilton County",
      "age_median": 54.9,
      "white_ratio": 0.9672958736,
      "income_per_capita": 245432
    },
    {
      "county_name": "Herkimer County",
      "age_median": 43.7,
      "white_ratio": 0.9650201807,
      "income_per_capita": 2666107
    },
    {
      "county_name": "Jefferson County",
      "age_median": 32.6,
      "white_ratio": 0.8776863162,
      "income_per_capita": 5421948
    },
    {
      "county_name": "Kings County",
      "age_median": 35.0,
      "white_ratio": 0.4961139355,
      "income_per_capita": 143558277
    },
    {
      "county_name": "Lewis County",
      "age_median": 41.7,
      "white_ratio": 0.9729050175,
      "income_per_capita": 1248290
    },
    {
      "county_name": "Livingston County",
      "age_median": 40.6,
      "white_ratio": 0.9366875,
      "income_per_capita": 3036716
    },
    {
      "county_name": "Madison County",
      "age_median": 41.5,
      "white_ratio": 0.9502570496,
      "income_per_capita": 3248686
    },
    {
      "county_name": "Monroe County",
      "age_median": 39.0,
      "white_ratio": 0.772038399,
      "income_per_capita": 40822554
    },
    {
      "county_name": "Montgomery County",
      "age_median": 41.0,
      "white_ratio": 0.9364233562,
      "income_per_capita": 2129908
    },
    {
      "county_name": "Nassau County",
      "age_median": 41.7,
      "white_ratio": 0.7538511688,
      "income_per_capita": 126521571
    },
    {
      "county_name": "New York County",
      "age_median": 37.3,
      "white_ratio": 0.6470106265,
      "income_per_capita": 322234277
    },
    {
      "county_name": "Niagara County",
      "age_median": 43.2,
      "white_ratio": 0.8806640385,
      "income_per_capita": 9879547
    },
    {
      "county_name": "Oneida County",
      "age_median": 41.1,
      "white_ratio": 0.8661009224,
      "income_per_capita": 10717184
    },
    {
      "county_name": "Onondaga County",
      "age_median": 39.1,
      "white_ratio": 0.8048367948,
      "income_per_capita": 25588791
    },
    {
      "county_name": "Ontario County",
      "age_median": 43.8,
      "white_ratio": 0.9391370424,
      "income_per_capita": 6097094
    },
    {
      "county_name": "Orange County",
      "age_median": 36.9,
      "white_ratio": 0.8134590086,
      "income_per_capita": 20654198
    },
    {
      "county_name": "Orleans County",
      "age_median": 42.7,
      "white_ratio": 0.9007200524,
      "income_per_capita": 1656434
    },
    {
      "county_name": "Oswego County",
      "age_median": 40.0,
      "white_ratio": 0.9627318222,
      "income_per_capita": 4922131
    },
    {
      "county_name": "Otsego County",
      "age_median": 42.5,
      "white_ratio": 0.9436905475,
      "income_per_capita": 2723259
    },
    {
      "county_name": "Putnam County",
      "age_median": 44.2,
      "white_ratio": 0.9235528194,
      "income_per_capita": 6819961
    },
    {
      "county_name": "Queens County",
      "age_median": 38.6,
      "white_ratio": 0.4859122692,
      "income_per_capita": 119472136
    },
    {
      "county_name": "Rensselaer County",
      "age_median": 39.9,
      "white_ratio": 0.8698695494,
      "income_per_capita": 8150849
    },
    {
      "county_name": "Richmond County",
      "age_median": 39.8,
      "white_ratio": 0.7672749135,
      "income_per_capita": 28040017
    },
    {
      "county_name": "Rockland County",
      "age_median": 36.2,
      "white_ratio": 0.7806550805,
      "income_per_capita": 20578968
    },
    {
      "county_name": "St. Lawrence County",
      "age_median": 38.6,
      "white_ratio": 0.938811684,
      "income_per_capita": 4276958
    },
    {
      "county_name": "Saratoga County",
      "age_median": 42.4,
      "white_ratio": 0.9337448596,
      "income_per_capita": 16724219
    },
    {
      "county_name": "Schenectady County",
      "age_median": 39.9,
      "white_ratio": 0.791946917,
      "income_per_capita": 8028487
    },
    {
      "county_name": "Schoharie County",
      "age_median": 45.3,
      "white_ratio": 0.960356504,
      "income_per_capita": 1336471
    },
    {
      "county_name": "Schuyler County",
      "age_median": 46.2,
      "white_ratio": 0.9672176769,
      "income_per_capita": 770370
    },
    {
      "county_name": "Seneca County",
      "age_median": 41.9,
      "white_ratio": 0.9177758571,
      "income_per_capita": 1378810
    },
    {
      "county_name": "Steuben County",
      "age_median": 42.9,
      "white_ratio": 0.9509375193,
      "income_per_capita": 4502999
    },
    {
      "county_name": "Suffolk County",
      "age_median": 41.5,
      "white_ratio": 0.8499030548,
      "income_per_capita": 106183846
    },
    {
      "county_name": "Sullivan County",
      "age_median": 42.9,
      "white_ratio": 0.8521395585,
      "income_per_capita": 3677559
    },
    {
      "county_name": "Tioga County",
      "age_median": 44.5,
      "white_ratio": 0.9665738162,
      "income_per_capita": 2264046
    },
    {
      "county_name": "Tompkins County",
      "age_median": 30.9,
      "white_ratio": 0.8148957665,
      "income_per_capita": 4750972
    },
    {
      "county_name": "Ulster County",
      "age_median": 44.0,
      "white_ratio": 0.8788664112,
      "income_per_capita": 9412460
    },
    {
      "county_name": "Warren County",
      "age_median": 46.3,
      "white_ratio": 0.9603960396,
      "income_per_capita": 3528483
    },
    {
      "county_name": "Washington County",
      "age_median": 43.8,
      "white_ratio": 0.9453353831,
      "income_per_capita": 2581625
    },
    {
      "county_name": "Wayne County",
      "age_median": 43.6,
      "white_ratio": 0.937614315,
      "income_per_capita": 4305806
    },
    {
      "county_name": "Westchester County",
      "age_median": 40.9,
      "white_ratio": 0.7405992371,
      "income_per_capita": 109790050
    },
    {
      "county_name": "Wyoming County",
      "age_median": 42.6,
      "white_ratio": 0.9232785912,
      "income_per_capita": 1720948
    },
    {
      "county_name": "Yates County",
      "age_median": 41.3,
      "white_ratio": 0.9699908217,
      "income_per_capita": 1018369
    }
  ]
  
  let { points, labels } = radvizMapper(data, labelMapping, labelAngles, 'county_name')

  return (
    <div className="App">
      <header className="App-header">
        <Radviz points={points} labels={labels} />
      </header>
    </div>
  );
}

export default App;
