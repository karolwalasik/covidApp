import React, {useState, useEffect} from 'react';
import axios from "axios";
import Dropdown from "../components/Dropdown";

const API_RUL = "https://api.apify.com/v2/key-value-stores/3Po6TV7wTht4vIEid/records/LATEST?disableRedirect=true"


const Root = () => {
    const [covidData, setCovidData] = useState(JSON.parse(sessionStorage.getItem('covidData')) || null);
    const [chosenRegion,setRegion] = useState(null);

    useEffect(() => {
        if (!sessionStorage.getItem('covidData')) {
            axios.get(API_RUL)
                .then(({data}) => {
                    console.log(data)
                    sessionStorage.setItem('covidData', JSON.stringify(data))
                    setCovidData(data);
                })
                .catch(error => console.log(error))
        }
    }, [chosenRegion])
    let [dataForChosenRegion] = chosenRegion ? covidData.infectedByRegion.filter(el => el.region === chosenRegion) : [];
    return (
        <div className={'pt-16 max-w-6xl p-6 mx-auto'}>
            <h1 className={'block text-gray-800 font-semibold text-3xl mt-3 text-center'}>Koronawirus - dzienne statystki</h1>
            <h2 className={'block text-gray-800 font-semibold text-3xl mt-2 text-center'}>Dane dla Polski</h2>
            {covidData &&
            <>
                <section className={'py-3'}>
                    <h3 className={'text-red-500  text-lg py-3 mt-16 text-center'}>Dane na
                        dzień {covidData.lastUpdatedAtApify.substring(0, 10)}</h3>
                    <div className={'py-3 grid grid-cols-2 justify-items-start items-center mx-auto bg-gray-200 p-5 grid-section'} style={{ maxWidth: '50%'}}>
                        <p className={'text-gray-800  w-full text-lg py-3 '}>Zakażonych:</p>
                        <p className={'text-gray-800 w-full text-lg py-3'}>{covidData.infected}</p>
                    <p className={'text-gray-800 w-full text-lg py-3'}>Zakażonych dzisiaj: </p><p className={'text-gray-800 w-full text-lg py-3'}>{covidData.infectedByRegion[0].infectedCount} </p>
                    <p className={'text-gray-800 w-full text-lg py-3'}>Zmarłych:  </p><p className={'text-gray-800 w-full text-lg py-3'}>{covidData.deceased}</p>
                    <p className={'text-gray-800 w-full text-lg py-3'}>Zmarłych dzisiaj: </p><p className={'text-gray-800 w-full text-lg py-3'}>{covidData.infectedByRegion[0].deceasedCount}</p>
                    </div>
                </section>
                <section>
                    <p className={'text-gray-500  text-lg py-3 mt-8 text-center'}>Wybierz województwo</p>
                    <Dropdown infectedByRegion={covidData.infectedByRegion} setRegion={setRegion}/>
                    {chosenRegion && <>
                        <p className={'text-center py-3'}>Dane dla {chosenRegion}go:</p>
                        <div className={'py-3 grid grid-cols-2 justify-items-start items-center mx-auto bg-gray-200 p-5 grid-section2'} style={{ maxWidth: '50%'}}>
                            <p className={'text-gray-800  w-full text-lg py-3 '}>Zakażonych: </p>
                            <p className={'text-gray-800 w-full text-lg py-3'}>{dataForChosenRegion?.infectedCount}</p>
                            <p className={'text-gray-800 w-full text-lg py-3'}>Zmarłych:  </p><p className={'text-gray-800 w-full text-lg py-3'}>{dataForChosenRegion?.deceasedCount}</p>
                        </div>

                    </>}

                </section>
            </>}
        </div>
    );
};

export default Root;