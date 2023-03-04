import { FormControlLabel } from "@mui/material";
import Stack from "@mui/material/Stack/Stack";
import Switch from "@mui/material/Switch/Switch";
import Typography from "@mui/material/Typography/Typography";
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
