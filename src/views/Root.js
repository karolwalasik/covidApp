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
            <h1 className={'block text-gray-800 font-semibold text-3xl mt-2 text-center'}>Statystyki</h1>
            {covidData &&
            <>
                <section className={'py-3'}>
                    <p className={'text-gray-800  text-lg py-3'}>Dane na
                        dzień {covidData.lastUpdatedAtApify.substring(0, 10)}</p>
                    <p className={'text-gray-800  text-lg py-3'}>Zakażonych: {covidData.infected} </p>
                    <p className={'text-gray-800  text-lg py-3'}>Zakażonych dzisiaj: {covidData.infectedByRegion[0].infectedCount} </p>
                    <p className={'text-gray-800  text-lg py-3'}>Zmarłych: {covidData.deceased} </p>
                    <p className={'text-gray-800  text-lg py-3'}>Zmarłych dzisiaj: {covidData.infectedByRegion[0].deceasedCount} </p>
                </section>
                <section>
                    <Dropdown infectedByRegion={covidData.infectedByRegion} setRegion={setRegion}/>
                    {chosenRegion && <>
                        <p>Dane dla {chosenRegion}go:</p>
                        <p>Zakażonych: {dataForChosenRegion?.infectedCount}</p>
                        <p>Zmarłych: {dataForChosenRegion?.deceasedCount}</p>
                    </>}

                </section>
            </>}
        </div>
    );
};

export default Root;