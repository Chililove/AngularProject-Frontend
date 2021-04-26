import { Component, OnInit } from '@angular/core';
import {StockService} from './shared/stock.service';
import {Subject} from 'rxjs';
import {StockDto} from './shared/stock.dto';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {

  stockFC = new FormControl('');
  public stockD: StockDto | undefined;
  allStocks: StockDto[] = [];
  unsubscribe$ = new Subject();
  selected = '';

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
  }

}
