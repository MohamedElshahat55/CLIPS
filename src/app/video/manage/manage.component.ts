import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css',
})
export class ManageComponent implements OnInit {
  videoOrder = '1';
  constructor(private _router: Router, private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this._route.queryParams.subscribe((params) => {
      this.videoOrder = params['sort'];
    });
  }
  sort(e: Event) {
    const { value } = e.target as HTMLSelectElement;
    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: {
        sort: value,
      },
    });
  }
}
