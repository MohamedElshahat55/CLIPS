import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClipsService } from '../../services/clips.service';
import IClip from '../../models/clip.model';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css',
})
export class ManageComponent implements OnInit {
  videoOrder = '1';
  clips: IClip[] = [];
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _clipService: ClipsService
  ) {}

  ngOnInit(): void {
    this._route.queryParams.subscribe((params) => {
      this.videoOrder = params['sort'];
    });
    this._clipService.getUserClips().subscribe((docs) => {
      this.clips = [];
      docs.forEach((doc) => {
        this.clips.push({
          docID: doc.id,
          ...doc.data(),
        });
      });
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
