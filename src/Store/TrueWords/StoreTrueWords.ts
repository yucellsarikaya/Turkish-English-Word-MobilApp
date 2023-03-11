import { FileOperationsLocalStorage as operations } from "../../Store/Operations/FileOperations";
export class StoreTrueWords {
  public static CeviriTip: "Tr-En" | "En-Tr" = "En-Tr";

  public static Kelime: Word;
  public static KelimeTr: string | undefined = undefined;
  public static KelimeEn: string | undefined = undefined;

  public static CevapKelime1: Word;
  public static CevapKelime1Tr: string | undefined = undefined;
  public static CevapKelime1En: string | undefined = undefined;

  public static CevapKelime2: Word | undefined = undefined;
  public static CevapKelime2Tr: string | undefined = undefined;
  public static CevapKelime2En: string | undefined = undefined;

  public static CevapButonArray: string[] = ["", "", ""];

  public static KelimeBul = async () => {
    const varMi: any = await operations.readSecretFile("trueWords");
    if (varMi) {
      let trueWordsArray: Word[] = await JSON.parse(varMi);
      if (trueWordsArray.length > 5) {
        this.LabelShow(false);
        let randomSayi = Math.abs(Date.now() % trueWordsArray.length);
        this.Kelime = trueWordsArray[randomSayi];
        this.KelimeEn = this.Kelime.english;
        this.KelimeTr = this.Kelime.turkish;
        await this.CevapKelimeleriBul();
      } else {
        this.LabelShow(true);
      }
    } else {
      this.LabelShow(true);
    }
  };

  public static CevapKelimeleriBul = async () => {
    const varMi: any = await operations.readSecretFile("trueWords");
    if (varMi) {
      let trueWordsArray: Word[] = await JSON.parse(varMi);
      let randomSayi = Math.abs((Date.now() % trueWordsArray.length) - 1);
      this.CevapKelime1 = trueWordsArray.filter(
        (i) => i.turkish !== this.KelimeTr && i.english !== this.KelimeEn
      )[randomSayi];
      this.CevapKelime1En = this.CevapKelime1.english;
      this.CevapKelime1Tr = this.CevapKelime1.turkish;

      randomSayi = Math.abs((Date.now() % trueWordsArray.length) - 2);
      this.CevapKelime2 = trueWordsArray.filter(
        (i) =>
          i.english !== this.KelimeEn &&
          i.turkish !== this.CevapKelime1Tr &&
          i.turkish !== this.KelimeTr &&
          i.english !== this.CevapKelime1En
      )[randomSayi];
      this.CevapKelime2En = this.CevapKelime2.english;
      this.CevapKelime2Tr = this.CevapKelime2.turkish;

      this.CevaplariYerlestir();
    }
  };

  public static CevaplariYerlestir = async () => {
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

  public static DogruCevapMi = async (cevap: string) => {
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

  public static isLabel: boolean = false;
  public static LabelShow = (show: boolean) => {
    this.isLabel = show;
  };

  public static FalseWordWrite = async (item: Word) => {
    const trueWords: any = await operations.readSecretFile("trueWords");
    if (trueWords) {
      let trueWordsArray: Word[] = await JSON.parse(trueWords);
      var index = trueWordsArray.findIndex(function (key) {
        return JSON.stringify(key) === JSON.stringify(item);
      });
      if (index !== -1) {
        trueWordsArray.splice(index, 1);
        console.log(trueWordsArray);
        await operations.writeSecretFile("trueWords", trueWordsArray);
      }
    }

    const falseWords: any = await operations.readSecretFile("falseWords");
    if (falseWords) {
      let falseWordsArray: Word[] = JSON.parse(falseWords);
      let KelimeVarMi = falseWordsArray.find(
        (i) => i.english === item.english && i.turkish === item.turkish
      );
      if (KelimeVarMi === undefined) {
        falseWordsArray.push(item);
        await operations.writeSecretFile("falseWords", falseWordsArray);
      }
    } else {
      await operations.writeSecretFile("falseWords", [item]);
    }
  };
}

interface Word {
  english: string;
  turkish: string;
}
