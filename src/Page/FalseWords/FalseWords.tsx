import { StoreFalseWords as Store } from "../../Store/FalseWords/StoreFalseWords";
import "./FalseWords.css";
import React, { useEffect, useState } from "react";
import AllWordsHeader from "../../Components/AllWordsHeader";
import FormLabel from "@mui/material/FormLabel/FormLabel";
import { Button, ButtonGroup } from "@mui/material";
import Modal from "../../Components/Modal";
import Label from "../../Components/Label";

export default function FalseWords({}: {}) {
  const [CeviriTipi, setCeviriTipi] = React.useState<boolean>(true);
  let [index, setIndex] = useState([1]);

  useEffect(() => {}, [setIndex]);

  const Reflesh = async () => {
    setIndex([...index, 1]);
  };

  return (
    <div>
      <div>
        <Label
          text="Devam etmek için en az 5 kelime bilmelisiniz"
          bool={Store.isLabel}
        />
      </div>
      <div style={{ display: "flex", marginLeft: "20%" }}>
        <AllWordsHeader
          CeviriTipi={CeviriTipi}
          setCeviriTipi={setCeviriTipi}
          CeviriTipiOnClik={async function (): Promise<void> {
            await Store.KelimeBul();
            Reflesh();
          }}
        />
        <Button
          className="Center-Word-root"
          onClick={async function (): Promise<void> {
            Store.CeviriTip = CeviriTipi ? "En-Tr" : "Tr-En";
            await Store.KelimeBul();
            Reflesh();
          }}
        >
          Kelime Üret
        </Button>
      </div>

      {CeviriTipi ? (
        <FormLabel className="Center-Word-root">
          İngilizce Kelimeniz:{" "}
          <span style={{ fontWeight: "bold" }}>
            {Store.Kelime && Store.Kelime.english ? Store.Kelime.english : ""}
          </span>
        </FormLabel>
      ) : (
        <FormLabel className="Center-Word-root">
          Türkçe Kelimeniz:{" "}
          <span style={{ fontWeight: "bold" }}>
            {Store.Kelime && Store.Kelime.turkish ? Store.Kelime.turkish : ""}
          </span>
        </FormLabel>
      )}

      {Store.isLabel ? (
        <></>
      ) : (
        <div className="Center-ReplyWord-root">
          <ButtonGroup variant="text" aria-label="text button group">
            <Button
              onClick={async function (): Promise<void> {
                Reflesh();
                Store.DogruCevapMi(Store.CevapButonArray[0]);
              }}
            >
              {Store.CevapButonArray[0]}
            </Button>
            <Button
              onClick={async function (): Promise<void> {
                Reflesh();
                Store.DogruCevapMi(Store.CevapButonArray[1]);
              }}
            >
              {Store.CevapButonArray[1]}
            </Button>
            <Button
              onClick={async function (): Promise<void> {
                Reflesh();
                Store.DogruCevapMi(Store.CevapButonArray[2]);
              }}
            >
              {Store.CevapButonArray[2]}
            </Button>
          </ButtonGroup>
        </div>
      )}

      <Modal
        isOpen={Store.isSuccess}
        onClose={async () => {
          await Store.TrueWordWrite(Store.Kelime);
          await Store.KelimeBul();
          Store.closeModalSuccess(false);
          Reflesh();
        }}
        title="Doğru bildiniz :)"
        isSuccess={true}
      >
        <></>
      </Modal>
      <Modal
        isOpen={Store.isError}
        onClose={async () => {
          await Store.KelimeBul();
          Store.closeModalError(false);
          Reflesh();
        }}
        title="Yanlış bildiniz :("
        isSuccess={false}
      >
        <div>
          <p>
            Doğrusu:{" "}
            {Store.Kelime && Store.Kelime.turkish ? Store.Kelime.turkish : ""} -{" "}
            {Store.Kelime && Store.Kelime.english ? Store.Kelime.english : ""}
          </p>
        </div>
      </Modal>
    </div>
  );
}
