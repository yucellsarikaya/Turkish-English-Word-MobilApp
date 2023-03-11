import { FormControlLabel } from "@mui/material";
import Switch from "@mui/material/Switch/Switch";
import React from "react";

export default function AllWordsHeader({
  CeviriTipi,
  setCeviriTipi,
  CeviriTipiOnClik
}: {
  CeviriTipi: boolean;
  setCeviriTipi: React.Dispatch<React.SetStateAction<boolean>>;
  CeviriTipiOnClik: ()=> void;
}) {
  return (
    <div 
    className="Center-Switch-root ">
      <FormControlLabel
        control={
          <Switch
            defaultChecked
            color="warning"
            checked={CeviriTipi}
            onClick={(e) => {
              setCeviriTipi(!CeviriTipi);
              CeviriTipiOnClik()
            }}
            inputProps={{ "aria-label": "ant design" }}
          />
        }
        label={CeviriTipi ? "İngilizce-Türkçe" : "Türkçe-İngilizce"}
      />
    </div>
  );
}
