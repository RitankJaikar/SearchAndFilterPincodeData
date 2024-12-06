import { useState } from "react";

export default function Result({res, pincode}) {
    const [filter, setFilter] = useState("");
    const [filteredData, setFilteredData] = useState(res[0]?.PostOffice);

    function handleChange(e) {
        setFilter(e.target.value);
        let filteredData1 = res[0]?.PostOffice.filter(data => data.Name.toLowerCase().includes(e.target.value.toLowerCase()));
        setFilteredData(filteredData1);
    }

    return  (
        <div className="flex flex-col gap-4 text-xl">
            <div><b>Pincode: {pincode}</b></div>
            <div><b>Message: {res[0].Message}</b> </div>
            {res[0].Message !== "No records found" ? 
            <div className="relative flex justify-center align-middle flex-col">
                <input type="text" placeholder="Filter" className="rounded p-2 w-full pl-12" value={filter} onChange={e => handleChange(e)} />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="absolute left-4 w-5 h-5"><path fill="#ffffff" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
            </div>
            :
            null}
            <div className="flex flex-wrap justify-between gap-y-2 md:gap-y-6">
            {
                filteredData && filteredData.map(data => {
                    return (
                        <div className="flex flex-col w-full p-4 gap-1 border-2 border-solid border-white rounded lg:w-[49%]" key={crypto.randomUUID()}>
                            <div>Name: {data.Name}</div>
                            <div>Branch Type: {data.BranchType}</div>
                            <div>Delivery Status: {data.DeliveryStatus}</div>
                            <div>District: {data.District}</div>
                            <div>Division: {data.Division}</div>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}