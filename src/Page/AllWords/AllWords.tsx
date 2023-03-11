import { StoreAllWords as Store } from "../../Store/AllWords/StoreAllWords";
import { FileOperationsLocalStorage as operations } from "../../Store/Operations/FileOperations";
import "./AllWords.css";
import React, { useEffect, useState } from "react";
import AllWordsHeader from "./AllWordsHeader";
import FormLabel from "@mui/material/FormLabel/FormLabel";
import { Button, ButtonGroup } from "@mui/material";
import Modal from "../../Components/Modal";

export default function AllWords({}: {}) {
  const [CeviriTipi, setCeviriTipi] = React.useState<boolean>(true);
  let [index, setIndex] = useState([1]);
  // const [isSuccess, setIsSuccess] = useState(false);
  // const [isError, setIsError] = useState(false);

  useEffect(() => {}, [setIndex]);

  const Reflesh = () => {
    setIndex([...index, 1]);
  };

  // const closeModalSuccess = () => {
  //   setIsSuccess(!isSuccess);
  // };
  // const closeModalError = () => {
  //   setIsError(!isError);
  // };
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
          Kelime Üret
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
          <Button
            onClick={function (): void {
              Reflesh();
              Store.DogruCevapMi(Store.CevapButonArray[0]);
            }}
          >
            {Store.CevapButonArray[0]}
          </Button>
          <Button
            onClick={function (): void {
              Reflesh();
              Store.DogruCevapMi(Store.CevapButonArray[1]);
            }}
          >
            {Store.CevapButonArray[1]}
          </Button>
          <Button
            onClick={function (): void {
              Reflesh();
              Store.DogruCevapMi(Store.CevapButonArray[2]);
            }}
          >
            {Store.CevapButonArray[2]}
          </Button>
        </ButtonGroup>
      </div>

      <Modal
        isOpen={Store.isSuccess}
        onClose={() => {
          Reflesh();
          Store.TrueWordWrite(Store.Kelime);
          Store.KelimeBul();
          Store.closeModalSuccess(false);
        }}
        title="Doğru bildiniz :)"
        isSuccess={true}
      >
        <></>
      </Modal>
      <Modal
        isOpen={Store.isError}
        onClose={() => {
          Reflesh();
          Store.FalseWordWrite(Store.Kelime);
          Store.KelimeBul();
          Store.closeModalError(false);
        }}
        title="Yanlış bildiniz :("
        isSuccess={false}
      >
        <div>
          <p>
            Doğrusu: {Store.KelimeTr ?? ""} - {Store.KelimeEn ?? ""}
          </p>
        </div>
      </Modal>
      {/* <button onClick={() => operations.readSecretFile()}>OKUMA</button>
      <button onClick={() => operations.writeSecretFile()}>yazma</button> */}
    </div>
  );
}
