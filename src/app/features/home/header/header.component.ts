import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonContent } from '@ionic/angular';
import '@doubletrade/lit-datepicker'; //import pour utiliser la balise html du datepicker

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit{
  // more to do is to create ngOnDestroy for scrolling method

  // get searchbar html element reference
  @ViewChild('searchbar', {static: true, read: ElementRef}) public searchbar!: ElementRef<HTMLElement>;
  @Input() public ionContent!: IonContent; //import ionic angular for scroll
  @Input() public places!: any[];
  public segmentVisible!: string | undefined;
  public form!: FormGroup;

  constructor(
    private readonly _router: Router,
    private readonly _ref: ElementRef<HTMLElement>,
    private readonly _alertCtrl: AlertController
  ) { 
    this.segmentVisible = 'places';
  }

  ngOnInit(): void {
    // generate airbnb form
    this.form = new FormGroup({
      where: new FormControl('', Validators.compose([
        Validators.required
      ])),
      arrivalDate: new FormControl('', Validators.compose([
        Validators.required
      ])),
      departureDate: new FormControl('', Validators.compose([
        Validators.required
      ])),
      who: new FormGroup({
        adultCount: new FormControl(0),
        childrenCount: new FormControl(0),
        babyCount: new FormControl(0),
      }),
      // can add room (one bed, two bed) or transport access
    });
  }

  ngAfterViewInit(): void {
    if (!this.ionContent?.scrollEvents) {
      this._ref.nativeElement.classList.add('scrolled');
      this._ref.nativeElement.classList.add('static');
      return;
    }
    this.ionContent.scrollEvents = true;
    this.ionContent.ionScroll.subscribe(($event) => {
      this.scrolling($event);
    });
  }

  // method who listen to the scroll event
  scrolling($event: any) {
    const {detail: {scrollTop = 0} = {}} = $event;
    if (!this._ref?.nativeElement) {
      return;
    }
    if (scrollTop > 5) {
      this._ref.nativeElement.classList.add('scrolled');
      this.segmentVisible = undefined;
      if (this.searchbar)
        this.searchbar.nativeElement.classList.remove('active');
    } else {
      this._ref.nativeElement.classList.remove('scrolled');
    }
  }

  async activate(segmentName: string) {
    this.segmentVisible = segmentName;
  }

  backHome() {
    this._router.navigate(['./']);
  }

  // set where option
  setWhere(value: string) {
    if (!this.form) {
      return;
    }
    this.form.patchValue({where: value});
    this.segmentVisible = 'arrivalDate';
  }

  // set Dates option
  setDates($event: any, optionKey: string) {
    const {detail: {value}} = $event;
    if (!value) {return}
    if (optionKey === 'from') {
      this.form?.patchValue({
        arrivalDate: value,
      });
    } else {
      this.form?.patchValue({
        departureDate: value,
      });
    }
  }

  // build a search query
  async search() {
    // check form validity and display error message
    if (!this.form?.valid) {
      const alertEl = await this._alertCtrl.create({
        header: 'Erreur',
        message: `Veuillez remplir le champ de recherche, s'il vous plait !`,
        buttons: [{text: 'ok'}]
      })
      alertEl.present();
      return;
    }
    const queryParams = this.form
    ? {
      ...this.form.value,
      ...this.form.value?.who
    }
    : {};
    // check value
    console.log(queryParams);
    // navigate to search page
    this._router.navigate(['/s'], {queryParams})
  }

}
