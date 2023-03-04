import { StoreAllWords as Store } from "../../Store/AllWords/StoreAllWords";
import "./AllWords.css";
import React, { useEffect, useState } from "react";
import AllWordsHeader from "./AllWordsHeader";
import FormLabel from "@mui/material/FormLabel/FormLabel";
import { Button, ButtonGroup } from "@mui/material";

export default function AllWords({}: {}) {
  const [CeviriTipi, setCeviriTipi] = React.useState<boolean>(true);
  let [index, setIndex] = useState([1]);

  useEffect(() => {}, [setIndex]);

  const Reflesh = () => {
    setIndex([...index, 1]);
  };
  return (
    <div>
      <div style={{ display: "flex", marginLeft: "20%" }}>
        <AllWordsHeader
          CeviriTipi={CeviriTipi}
          setCeviriTipi={setCeviriTipi}
          CeviriTipiOnClik={function (): void {
            Store.KelimeBul();
          }}
        />
        <Button
          className="Center-Word-root"
          onClick={function (): void {
            Reflesh();
            Store.CeviriTip = CeviriTipi ? "En-Tr" : "Tr-En";
            Store.KelimeBul();
          }}
        >
          Kelime Değiş
        </Button>
      </div>

      {CeviriTipi ? (
        <FormLabel className="Center-Word-root">
          İngilizce Kelimeniz:{" "}
          <span style={{ fontWeight: "bold" }}>
            {Store.KelimeEn ? Store.KelimeEn : ""}
          </span>
        </FormLabel>
      ) : (
        <FormLabel className="Center-Word-root">
          Türkçe Kelimeniz:{" "}
          <span style={{ fontWeight: "bold" }}>
            {Store.KelimeTr ? Store.KelimeTr : ""}
          </span>
        </FormLabel>
      )}

      <div className="Center-ReplyWord-root">
        <ButtonGroup variant="text" aria-label="text button group">
          <Button>{Store.CevapButonArray[0]}</Button>
          <Button>{Store.CevapButonArray[1]}</Button>
          <Button>{Store.CevapButonArray[2]}</Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
