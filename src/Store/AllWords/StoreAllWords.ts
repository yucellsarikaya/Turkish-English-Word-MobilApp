import Words from "../../Words/Words.json";

export class StoreAllWords {
  public static CeviriTip: "Tr-En" | "En-Tr" = "En-Tr";

  public static Kelime: Word | undefined = undefined;
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

    if (this.CeviriTip === "En-Tr") {
      this.CevapButonArray[num1] = this.KelimeEn || "";
      this.CevapButonArray[num2] = this.CevapKelime1En || "";
      this.CevapButonArray[num3] = this.CevapKelime2En || "";
    } else {
      this.CevapButonArray[num1] = this.KelimeTr || "";
      this.CevapButonArray[num2] = this.CevapKelime1Tr || "";
      this.CevapButonArray[num3] = this.CevapKelime2Tr || "";
    }
    console.log(this.CevapButonArray);
  };
}

interface Word {
  english: string;
  turkish: string;
}