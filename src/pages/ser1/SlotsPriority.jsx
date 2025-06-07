import { useEffect, useState } from "react";
import PriorityRoutineTable from "./ser1_components/PriorityRoutineTable";

const SlotsPriority = ({ teachers, serialWiseSlots, setSerialWiseSlots }) => {
    return (
        <>
            <h2 className="text-center"> Based on the Teacher Priority create Slots Priority </h2>
            <PriorityRoutineTable
                teachers={teachers}
                serialWiseSlots={serialWiseSlots}
                setSerialWiseSlots={setSerialWiseSlots}
            />
        </>
    )
}

export default SlotsPriority;