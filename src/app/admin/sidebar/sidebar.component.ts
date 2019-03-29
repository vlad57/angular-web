import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input()
  toggleSidebar: boolean;
  @Input()
  listF: boolean;
  @Input()
  ajoutF: boolean;

  constructor() { }

  ngOnInit() {
  }

}
