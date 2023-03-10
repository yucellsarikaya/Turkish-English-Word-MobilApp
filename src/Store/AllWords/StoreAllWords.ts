import Words from "../../Words/Words.json";
import { FileOperations as operations } from "../../Store/Operations/FileOperations";
export class StoreAllWords {
  public static CeviriTip: "Tr-En" | "En-Tr" = "En-Tr";

  public static Kelime: Word;
  public static KelimeTr: string | undefined = undefined;
  public static KelimeEn: string | undefined = undefined;

  public static CevapKelime1: Word | undefined = undefined;
  public static CevapKelime1Tr: string | undefined = undefined;
  public static CevapKelime1En: string | undefined = undefined;

  public static CevapKelime2: Word | undefined = undefined;
  public static CevapKelime2Tr: string | undefined = undefined;
  public static CevapKelime2En: string | undefined = undefined;

  public static CevapButonArray: string[] = ["", "", ""];

  public static KelimeBul = () => {
    this.Kelime = Words[Math.floor(Math.random() * Words.length)];
    this.KelimeEn = this.Kelime.english;
    this.KelimeTr = this.Kelime.turkish;
    this.CevapKelimeleriBul();
  };

  public static CevapKelimeleriBul = () => {
    this.CevapKelime1 = Words.filter(
      (i) => i.english !== this.KelimeEn && i.turkish != this.KelimeTr
    )[Math.floor(Math.random() * Words.length)];
    this.CevapKelime1En = this.CevapKelime1.english;
    this.CevapKelime1Tr = this.CevapKelime1.turkish;

    this.CevapKelime2 = Words.filter(
      (i) =>
        i.english !== this.KelimeEn &&
        i.turkish !== this.CevapKelime1Tr &&
        i.turkish !== this.KelimeTr &&
        i.english !== this.CevapKelime1En
    )[Math.floor(Math.random() * Words.length)];
    this.CevapKelime2En = this.CevapKelime2.english;
    this.CevapKelime2Tr = this.CevapKelime2.turkish;

    this.CevaplariYerlestir();
  };

  public static CevaplariYerlestir = () => {
    let num1, num2, num3;
    do {
      num1 = Math.floor(Math.random() * 3);
      num2 = Math.floor(Math.random() * 3);
      num3 = Math.floor(Math.random() * 3);
    } while (num1 === num2 || num1 === num3 || num2 === num3);

    if (this.CeviriTip === "Tr-En") {
      this.CevapButonArray[num1] = this.KelimeEn || "";
      this.CevapButonArray[num2] = this.CevapKelime1En || "";
      this.CevapButonArray[num3] = this.CevapKelime2En || "";
    } else {
      this.CevapButonArray[num1] = this.KelimeTr || "";
      this.CevapButonArray[num2] = this.CevapKelime1Tr || "";
      this.CevapButonArray[num3] = this.CevapKelime2Tr || "";
    }
  };

  public static DogruCevapMi = (cevap: string) => {
    if (this.CeviriTip === "Tr-En") {
      if (cevap === this.KelimeEn) {
        this.closeModalSuccess(true);
      } else {
        this.closeModalError(true);
      }
    } else {
      if (cevap === this.KelimeTr) {
        this.closeModalSuccess(true);
      } else {
        this.closeModalError(true);
      }
    }
  };

  public static isSuccess: boolean = false;
  public static closeModalSuccess = (show: boolean) => {
    this.isSuccess = show;
  };

  public static isError: boolean = false;
  public static closeModalError = (show: boolean) => {
    this.isError = show;
  };

  public static TrueWordWrite = async (item: Word) => {
    const varMi: any = await operations.readFile("trueWords");
    if (varMi) {
      let trueWordsArray: Word[] = JSON.parse(varMi);
      let KelimeVarMi = trueWordsArray.find(
        (i) => i.turkish === item.turkish && i.english === item.english
      );
      if (KelimeVarMi === undefined) {
        trueWordsArray.push(item);
        await  operations.writeFile("trueWords", trueWordsArray);
      }
    } else {
      await  operations.writeFile("trueWords", [item]);
    }
  };

  public static FalseWordWrite = async (item: Word) => {
    const varMi: any = await operations.readFile("falseWords");
    if (varMi) {
      let falseWordsArray: Word[] = JSON.parse(varMi);
      let KelimeVarMi = falseWordsArray.find(
        (i) => i.turkish === item.turkish && i.english === item.english
      );
      if (KelimeVarMi === undefined) {
        falseWordsArray.push(item);
        await  operations.writeFile("falseWords", falseWordsArray);
      }
    } else {
      await  operations.writeFile("falseWords", [item]);
    }
  };
}

interface Word {
  english: string;
  turkish: string;
}
