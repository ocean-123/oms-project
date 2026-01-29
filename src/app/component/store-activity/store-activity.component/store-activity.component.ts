import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreActivityService } from '../../../service/store-activity/store-activity.service';
import { StoreInventoryService } from '../../../service/store-inventory/store-inventory.service';
import { ItemsService } from '../../../service/items/items.service';
import { StoreActivity } from '../../../models/store-activity.model';
import { StoreInventory } from '../../../models/store-inventory.model';
import { Items } from '../../../models/items.model';

@Component({
  selector: 'app-store-activity',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './store-activity.component.html',
  styleUrl: './store-activity.component.css'
})
export class StoreActivityComponent implements OnInit {
  showForm: boolean = false;
  activities: StoreActivity[] = [];
  inventory: StoreInventory[] = [];
  items: Items[] = [];

  formData: any = {
    item: null,
    transactionType: 'RECEIVED',
    sourceType: 'VENDOR',
    sourceName: '',
    destinationType: '',
    destinationName: '',
    quantity: 1,
    remarks: ''
  };

  transactionTypes = ['RECEIVED', 'SENT', 'IN_STOCK'];
  sourceTypes = ['VENDOR', 'BRANCH', 'INTERNAL'];

  constructor(
    private activityService: StoreActivityService,
    private inventoryService: StoreInventoryService,
    private itemsService: ItemsService
  ) {}

  ngOnInit(): void {
    this.loadItems();
    this.loadActivities();
    this.loadInventory();
  }

  loadItems(): void {
    this.itemsService.getAllItems().subscribe({
      next: (data) => this.items = data,
      error: (err) => console.error('Error loading items:', err)
    });
  }

  loadActivities(): void {
    this.activityService.getAllActivities().subscribe({
      next: (data) => this.activities = data,
      error: (err) => console.error('Error loading activities:', err)
    });
  }

  loadInventory(): void {
    this.inventoryService.getAllInventory().subscribe({
      next: (data) => this.inventory = data,
      error: (err) => console.error('Error loading inventory:', err)
    });
  }

  submitActivity(): void {
    const activity: StoreActivity = {
      item: this.formData.item,
      transactionType: this.formData.transactionType,
      sourceType: this.formData.sourceType,
      sourceName: this.formData.sourceName,
      destinationType: this.formData.destinationType,
      destinationName: this.formData.destinationName,
      quantity: this.formData.quantity,
      remarks: this.formData.remarks
    };

    this.activityService.recordActivity(activity).subscribe({
      next: () => {
        alert('Activity recorded successfully!');
        this.resetForm();
        this.showForm = false;
        this.loadActivities();
        this.loadInventory();
      },
      error: (err) => {
        console.error('Error recording activity:', err);
        alert('Failed to record activity');
      }
    });
  }

  resetForm(): void {
    this.formData = {
      item: null,
      transactionType: 'RECEIVED',
      sourceType: 'VENDOR',
      sourceName: '',
      destinationType: '',
      destinationName: '',
      quantity: 1,
      remarks: ''
    };
  }
}
