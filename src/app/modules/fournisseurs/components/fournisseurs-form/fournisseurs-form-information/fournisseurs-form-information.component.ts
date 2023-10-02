import { Component, OnInit, Input } from '@angular/core';
import { Fournisseur } from '../../../models/fournisseur.model';
import { Willaya } from 'app/modules/willaya/models/willaya';
import { SharedService } from 'app/modules/company/services/shared.service';
import { WillayaService } from 'app/modules/willaya/services/willaya.service';

@Component({
  selector: 'app-fournisseurs-form-information',
  templateUrl: './fournisseurs-form-information.component.html',
  styleUrls: ['./fournisseurs-form-information.component.scss']
})
export class FournisseursFormInformationComponent implements OnInit {

  @Input() fournisseur!: Fournisseur
  wilayas: Array<Willaya> = []

  countryPhoneCodes = [
    { "country": "Afghanistan", "code": "+93", "flag": "af" },
    { "country": "Albania", "code": "+355", "flag": "al" },
    { "country": "Algeria", "code": "+213", "flag": "dz" },
    { "country": "American Samoa", "code": "+1-684", "flag": "as" },
    { "country": "Andorra", "code": "+376", "flag": "ad" },
    { "country": "Angola", "code": "+244", "flag": "ao" },
    { "country": "Anguilla", "code": "+1-264", "flag": "ai" },
    { "country": "Antarctica", "code": "+672", "flag": "aq" },
    { "country": "Antigua and Barbuda", "code": "+1-268", "flag": "ag" },
    { "country": "Argentina", "code": "+54", "flag": "ar" },
    { "country": "Armenia", "code": "+374", "flag": "am" },
    { "country": "Aruba", "code": "+297", "flag": "aw" },
    { "country": "Australia", "code": "+61", "flag": "au" },
    { "country": "Austria", "code": "+43", "flag": "at" },
    { "country": "Azerbaijan", "code": "+994", "flag": "az" },
    { "country": "Bahamas", "code": "+1-242", "flag": "bs" },
    { "country": "Bahrain", "code": "+973", "flag": "bh" },
    { "country": "Bangladesh", "code": "+880", "flag": "bd" },
    { "country": "Barbados", "code": "+1-246", "flag": "bb" },
    { "country": "Belarus", "code": "+375", "flag": "by" },
    { "country": "Belgium", "code": "+32", "flag": "be" },
    { "country": "Belize", "code": "+501", "flag": "bz" },
    { "country": "Benin", "code": "+229", "flag": "bj" },
    { "country": "Bermuda", "code": "+1-441", "flag": "bm" },
    { "country": "Bhutan", "code": "+975", "flag": "bt" },
    { "country": "Bolivia", "code": "+591", "flag": "bo" },
    { "country": "Bosnia and Herzegovina", "code": "+387", "flag": "ba" },
    { "country": "Botswana", "code": "+267", "flag": "bw" },
    { "country": "Brazil", "code": "+55", "flag": "br" },
    { "country": "British Indian Ocean Territory", "code": "+246", "flag": "io" },
    { "country": "British Virgin Islands", "code": "+1-284", "flag": "vg" },
    { "country": "Brunei", "code": "+673", "flag": "bn" },
    { "country": "Bulgaria", "code": "+359", "flag": "bg" },
    { "country": "Burkina Faso", "code": "+226", "flag": "bf" },
    { "country": "Burundi", "code": "+257", "flag": "bi" },
    { "country": "Cambodia", "code": "+855", "flag": "kh" },
    { "country": "Cameroon", "code": "+237", "flag": "cm" },
    { "country": "Canada", "code": "+1", "flag": "ca" },
    { "country": "Cape Verde", "code": "+238", "flag": "cv" },
    { "country": "Cayman Islands", "code": "+1-345", "flag": "ky" },
    { "country": "Central African Republic", "code": "+236", "flag": "cf" },
    { "country": "Chad", "code": "+235", "flag": "td" },
    { "country": "Chile", "code": "+56", "flag": "cl" },
    { "country": "China", "code": "+86", "flag": "cn" },
    { "country": "Christmas Island", "code": "+61", "flag": "cx" },
    { "country": "Cocos Islands", "code": "+61", "flag": "cc" },
    { "country": "Colombia", "code": "+57", "flag": "co" },
    { "country": "Comoros", "code": "+269", "flag": "km" },
    { "country": "Cook Islands", "code": "+682", "flag": "ck" },
    { "country": "Costa Rica", "code": "+506", "flag": "cr" },
    { "country": "Croatia", "code": "+385", "flag": "hr" },
    { "country": "Cuba", "code": "+53", "flag": "cu" },
    { "country": "Curacao", "code": "+599", "flag": "cw" },
    { "country": "Cyprus", "code": "+357", "flag": "cy" },
    { "country": "Czech Republic", "code": "+420", "flag": "cz" },
    { "country": "Democratic Republic of the Congo", "code": "+243", "flag": "cd" },
    { "country": "Denmark", "code": "+45", "flag": "dk" },
    { "country": "Djibouti", "code": "+253", "flag": "dj" },
    { "country": "Dominica", "code": "+1-767", "flag": "dm" },
    { "country": "Dominican Republic", "code": "+1-809, +1-829, +1-849", "flag": "do" },
    { "country": "East Timor", "code": "+670", "flag": "tl" },
    { "country": "Ecuador", "code": "+593", "flag": "ec" },
    { "country": "Egypt", "code": "+20", "flag": "eg" },
    { "country": "El Salvador", "code": "+503", "flag": "sv" },
    { "country": "Equatorial Guinea", "code": "+240", "flag": "gq" },
    { "country": "Eritrea", "code": "+291", "flag": "er" },
    { "country": "Estonia", "code": "+372", "flag": "ee" },
    { "country": "Ethiopia", "code": "+251", "flag": "et" },
    { "country": "Falkland Islands", "code": "+500", "flag": "fk" },
    { "country": "Faroe Islands", "code": "+298", "flag": "fo" },
    { "country": "Fiji", "code": "+679", "flag": "fj" },
    { "country": "Finland", "code": "+358", "flag": "fi" },
    { "country": "France", "code": "+33", "flag": "fr" },
    { "country": "French Polynesia", "code": "+689", "flag": "pf" },
    { "country": "Gabon", "code": "+241", "flag": "ga" },
    { "country": "Gambia", "code": "+220", "flag": "gm" },
    { "country": "Georgia", "code": "+995", "flag": "ge" },
    { "country": "Germany", "code": "+49", "flag": "de" },
    { "country": "Ghana", "code": "+233", "flag": "gh" },
    { "country": "Gibraltar", "code": "+350", "flag": "gi" },
    { "country": "Greece", "code": "+30", "flag": "gr" },
    { "country": "Greenland", "code": "+299", "flag": "gl" },
    { "country": "Grenada", "code": "+1-473", "flag": "gd" },
    { "country": "Guam", "code": "+1-671", "flag": "gu" },
    { "country": "Guatemala", "code": "+502", "flag": "gt" },
    { "country": "Guernsey", "code": "+44-1481", "flag": "gg" },
    { "country": "Guinea", "code": "+224", "flag": "gn" },
    { "country": "Guinea-Bissau", "code": "+245", "flag": "gw" },
    { "country": "Guyana", "code": "+592", "flag": "gy" },
    { "country": "Haiti", "code": "+509", "flag": "ht" },
    { "country": "Honduras", "code": "+504", "flag": "hn" },
    { "country": "Hong Kong", "code": "+852", "flag": "hk" },
    { "country": "Hungary", "code": "+36", "flag": "hu" },
    { "country": "Iceland", "code": "+354", "flag": "is" },
    { "country": "India", "code": "+91", "flag": "in" },
    { "country": "Indonesia", "code": "+62", "flag": "id" },
    { "country": "Iran", "code": "+98", "flag": "ir" },
    { "country": "Iraq", "code": "+964", "flag": "iq" },
    { "country": "Ireland", "code": "+353", "flag": "ie" },
    { "country": "Isle of Man", "code": "+44-1624", "flag": "im" },
    { "country": "Italy", "code": "+39", "flag": "it" },
    { "country": "Ivory Coast", "code": "+225", "flag": "ci" },
    { "country": "Jamaica", "code": "+1-876", "flag": "jm" },
    { "country": "Japan", "code": "+81", "flag": "jp" },
    { "country": "Jersey", "code": "+44-1534", "flag": "je" },
    { "country": "Jordan", "code": "+962", "flag": "jo" },
    { "country": "Kazakhstan", "code": "+7", "flag": "kz" },
    { "country": "Kenya", "code": "+254", "flag": "ke" },
    { "country": "Kiribati", "code": "+686", "flag": "ki" },
    { "country": "Kosovo", "code": "+383", "flag": "xk" },
    { "country": "Kuwait", "code": "+965", "flag": "kw" },
    { "country": "Kyrgyzstan", "code": "+996", "flag": "kg" },
    { "country": "Laos", "code": "+856", "flag": "la" },
    { "country": "Latvia", "code": "+371", "flag": "lv" },
    { "country": "Lebanon", "code": "+961", "flag": "lb" },
    { "country": "Lesotho", "code": "+266", "flag": "ls" },
    { "country": "Liberia", "code": "+231", "flag": "lr" },
    { "country": "Libya", "code": "+218", "flag": "ly" },
    { "country": "Liechtenstein", "code": "+423", "flag": "li" },
    { "country": "Lithuania", "code": "+370", "flag": "lt" },
    { "country": "Luxembourg", "code": "+352", "flag": "lu" },
    { "country": "Macau", "code": "+853", "flag": "mo" },
    { "country": "Macedonia", "code": "+389", "flag": "mk" },
    { "country": "Madagascar", "code": "+261", "flag": "mg" },
    { "country": "Malawi", "code": "+265", "flag": "mw" },
    { "country": "Malaysia", "code": "+60", "flag": "my" },
    { "country": "Maldives", "code": "+960", "flag": "mv" },
    { "country": "Mali", "code": "+223", "flag": "ml" },
    { "country": "Malta", "code": "+356", "flag": "mt" },
    { "country": "Marshall Islands", "code": "+692", "flag": "mh" },
    { "country": "Mauritania", "code": "+222", "flag": "mr" },
    { "country": "Mauritius", "code": "+230", "flag": "mu" },
    { "country": "Mayotte", "code": "+262", "flag": "yt" },
    { "country": "Mexico", "code": "+52", "flag": "mx" },
    { "country": "Micronesia", "code": "+691", "flag": "fm" },
    { "country": "Moldova", "code": "+373", "flag": "md" },
    { "country": "Monaco", "code": "+377", "flag": "mc" },
    { "country": "Mongolia", "code": "+976", "flag": "mn" },
    { "country": "Montenegro", "code": "+382", "flag": "me" },
    { "country": "Montserrat", "code": "+1-664", "flag": "ms" },
    { "country": "Morocco", "code": "+212", "flag": "ma" },
    { "country": "Mozambique", "code": "+258", "flag": "mz" },
    { "country": "Myanmar", "code": "+95", "flag": "mm" },
    { "country": "Namibia", "code": "+264", "flag": "na" },
    { "country": "Nauru", "code": "+674", "flag": "nr" },
    { "country": "Nepal", "code": "+977", "flag": "np" },
    { "country": "Netherlands", "code": "+31", "flag": "nl" },
    { "country": "Netherlands Antilles", "code": "+599", "flag": "an" },
    { "country": "New Caledonia", "code": "+687", "flag": "nc" },
    { "country": "New Zealand", "code": "+64", "flag": "nz" },
    { "country": "Nicaragua", "code": "+505", "flag": "ni" },
    { "country": "Niger", "code": "+227", "flag": "ne" },
    { "country": "Nigeria", "code": "+234", "flag": "ng" },
    { "country": "Niue", "code": "+683", "flag": "nu" },
    { "country": "North Korea", "code": "+850", "flag": "kp" },
    { "country": "Northern Mariana Islands", "code": "+1-670", "flag": "mp" },
    { "country": "Norway", "code": "+47", "flag": "no" },
    { "country": "Oman", "code": "+968", "flag": "om" },
    { "country": "Pakistan", "code": "+92", "flag": "pk" },
    { "country": "Palau", "code": "+680", "flag": "pw" },
    { "country": "Palestine", "code": "+970", "flag": "ps" },
    { "country": "Panama", "code": "+507", "flag": "pa" },
    { "country": "Papua New Guinea", "code": "+675", "flag": "pg" },
    { "country": "Paraguay", "code": "+595", "flag": "py" },
    { "country": "Peru", "code": "+51", "flag": "pe" },
    { "country": "Philippines", "code": "+63", "flag": "ph" },
    { "country": "Pitcairn", "code": "+64", "flag": "pn" },
    { "country": "Poland", "code": "+48", "flag": "pl" },
    { "country": "Portugal", "code": "+351", "flag": "pt" },
    { "country": "Puerto Rico", "code": "+1-787, +1-939", "flag": "pr" },
    { "country": "Qatar", "code": "+974", "flag": "qa" },
    { "country": "Republic of the Congo", "code": "+242", "flag": "cg" },
    { "country": "Reunion", "code": "+262", "flag": "re" },
    { "country": "Romania", "code": "+40", "flag": "ro" },
    { "country": "Russia", "code": "+7", "flag": "ru" },
    { "country": "Rwanda", "code": "+250", "flag": "rw" },
    { "country": "Saint Barthelemy", "code": "+590", "flag": "bl" },
    { "country": "Saint Helena", "code": "+290", "flag": "sh" },
    { "country": "Saint Kitts and Nevis", "code": "+1-869", "flag": "kn" },
    { "country": "Saint Lucia", "code": "+1-758", "flag": "lc" },
    { "country": "Saint Martin", "code": "+590", "flag": "mf" },
    { "country": "Saint Pierre and Miquelon", "code": "+508", "flag": "pm" },
    { "country": "Saint Vincent and the Grenadines", "code": "+1-784", "flag": "vc" },
    { "country": "Samoa", "code": "+685", "flag": "ws" },
    { "country": "San Marino", "code": "+378", "flag": "sm" },
    { "country": "Sao Tome and Principe", "code": "+239", "flag": "st" },
    { "country": "Saudi Arabia", "code": "+966", "flag": "sa" },
    { "country": "Senegal", "code": "+221", "flag": "sn" },
    { "country": "Serbia", "code": "+381", "flag": "rs" },
    { "country": "Seychelles", "code": "+248", "flag": "sc" },
    { "country": "Sierra Leone", "code": "+232", "flag": "sl" },
    { "country": "Singapore", "code": "+65", "flag": "sg" },
    { "country": "Sint Maarten", "code": "+1-721", "flag": "sx" },
    { "country": "Slovakia", "code": "+421", "flag": "sk" },
    { "country": "Slovenia", "code": "+386", "flag": "si" },
    { "country": "Solomon Islands", "code": "+677", "flag": "sb" },
    { "country": "Somalia", "code": "+252", "flag": "so" },
    { "country": "South Africa", "code": "+27", "flag": "za" },
    { "country": "South Korea", "code": "+82", "flag": "kr" },
    { "country": "South Sudan", "code": "+211", "flag": "ss" },
    { "country": "Spain", "code": "+34", "flag": "es" },
    { "country": "Sri Lanka", "code": "+94", "flag": "lk" },
    { "country": "Sudan", "code": "+249", "flag": "sd" },
    { "country": "Suriname", "code": "+597", "flag": "sr" },
    { "country": "Svalbard and Jan Mayen", "code": "+47", "flag": "sj" },
    { "country": "Swaziland", "code": "+268", "flag": "sz" },
    { "country": "Sweden", "code": "+46", "flag": "se" },
    { "country": "Switzerland", "code": "+41", "flag": "ch" },
    { "country": "Syria", "code": "+963", "flag": "sy" },
    { "country": "Taiwan", "code": "+886", "flag": "tw" },
    { "country": "Tajikistan", "code": "+992", "flag": "tj" },
    { "country": "Tanzania", "code": "+255", "flag": "tz" },
    { "country": "Thailand", "code": "+66", "flag": "th" },
    { "country": "Togo", "code": "+228", "flag": "tg" },
    { "country": "Tokelau", "code": "+690", "flag": "tk" },
    { "country": "Tonga", "code": "+676", "flag": "to" },
    { "country": "Trinidad and Tobago", "code": "+1-868", "flag": "tt" },
    { "country": "Tunisia", "code": "+216", "flag": "tn" },
    { "country": "Turkey", "code": "+90", "flag": "tr" },
    { "country": "Turkmenistan", "code": "+993", "flag": "tm" },
    { "country": "Turks and Caicos Islands", "code": "+1-649", "flag": "tc" },
    { "country": "Tuvalu", "code": "+688", "flag": "tv" },
    { "country": "U.S. Virgin Islands", "code": "+1-340", "flag": "vi" },
    { "country": "Uganda", "code": "+256", "flag": "ug" },
    { "country": "Ukraine", "code": "+380", "flag": "ua" },
    { "country": "United Arab Emirates", "code": "+971", "flag": "ae" },
    { "country": "United Kingdom", "code": "+44", "flag": "gb" },
    { "country": "United States", "code": "+1", "flag": "us" },
    { "country": "Uruguay", "code": "+598", "flag": "uy" },
    { "country": "Uzbekistan", "code": "+998", "flag": "uz" },
    { "country": "Vanuatu", "code": "+678", "flag": "vu" },
    { "country": "Vatican", "code": "+379", "flag": "va" },
    { "country": "Venezuela", "code": "+58", "flag": "ve" },
    { "country": "Vietnam", "code": "+84", "flag": "vn" },
    { "country": "Wallis and Futuna", "code": "+681", "flag": "wf" },
    { "country": "Western Sahara", "code": "+212", "flag": "eh" },
    { "country": "Yemen", "code": "+967", "flag": "ye" },
    { "country": "Zambia", "code": "+260", "flag": "zm" },
    { "country": "Zimbabwe", "code": "+263", "flag": "zw" }
  ];
  flag=""
  getflage(){
    return "https://flagcdn.com/w320/"+this.flag+".png"
  }

  selectContry(c:any){
    // let nav = document.getElementById(`mobile`) as any;
    //   nav.value =c.target.value ;
      this.fournisseur.phone=c.target.value
      // console.log("aaa::",this.countryPhoneCodes.filter(el=>{return el.code== c.target.value}))
      this.flag=this.countryPhoneCodes.filter(el=>{return el.code== c.target.value})[0].flag
      let f = document.getElementById(`flag`) as any;
      f.src =this.flag ;
      this.getflage()
  }

  codeCityLengthvalidator=false
  codeCityLength(e:any){
    if( e.target.value.length>10){
      this.sharedService.setIsActive(false)
      this.codeCityLengthvalidator=true
    }else{
      this.sharedService.setIsActive(true)
      this.codeCityLengthvalidator=false
    }
  }

  phoneNumberinp(e:any){
    e.target.value=e.target.value.replace(/[^0-9+\-\s]/g, '')
  }

  constructor(private sharedService: SharedService,
    private wilayaservice: WillayaService) { }

  ngOnInit(): void {
    this.getAllWillaya()
  }

  getAllWillaya() {
    this.wilayaservice.findAll().subscribe({
      next: (result) => { this.wilayas = result; console.log("2==", result) },
      error: (error) => console.error(error),
    });
  }
  selectValue(e: any) {
    let wil = this.wilayas.filter(el => {
      return el.code == e.target.value

    })[0]
    this.fournisseur.wilayaName = wil.name
    this.fournisseur.wilayaCode = wil.code

  }

  emailIsvalid = false

  validationEmail() {
    const emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    console.log(this.fournisseur.email)
    if (emailRegex.test(this.fournisseur.email)) {
      this.emailIsvalid = false;
      console.log(this.fournisseur.email)
      this.sharedService.setIsActive(true);

    }
    else {
      this.emailIsvalid = true
      this.sharedService.setIsActive(false);

    }

  }
  minIphone: boolean = false
  isBlur3() {
    if ((this.fournisseur.phone.toString().length < 12) || (this.fournisseur.phone.toString().length > 13)) {
      this.minIphone = true;
    } else {
      this.minIphone = false;
    }
  }
}
