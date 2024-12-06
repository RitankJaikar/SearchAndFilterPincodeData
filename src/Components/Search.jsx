import { useState } from "react";
import Result from "./Result";

export default function Search() {
    const [pincode, setPincode] = useState("");
    const [err1, setErr1] = useState("");
    const [err2, setErr2] = useState("");
    const [res, setRes] = useState("");
    const [isSearched, setIsSearched] = useState(false);
    const [loader, setLoader] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setLoader(true);
        if(pincode.length !== 6) {
            setErr1("Please Enter Valid 6 Digit Pincode");
            setIsSearched(false);
            setLoader(false);
            return;
        }
        setErr1("");
        setErr2("");
        setIsSearched(true);

        fetch(`https://api.postalpincode.in/pincode/${pincode}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setRes(data);
                setLoader(false);
            })
            .catch(err => {
                // console.log(err);
                setErr2("Some Error Occured.");
                setLoader(false);
            })
    }

    return (
        <div>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <label htmlFor="pincode" className="text-xl font-bold">Enter Pincode</label>
                <input type="number" id="pincode" className="rounded p-2" placeholder="Pincode" value={pincode} onChange={e => setPincode(e.target.value)} required />
                {err1 ? <div className="text-red-600">{err1}</div> : null}
                <button className="max-w-fit pl-20 pr-20">Lookup</button>
            </form>
            <br /><br />
            {loader ? <div className="loader">Loading<span className="dots"></span></div> : (!err2 ? (!err1 && isSearched ? <Result res={res} pincode={pincode} /> : null) : <div>{err2}</div>)}
        </div>
    )
}