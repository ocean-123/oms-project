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
  showEditForm: boolean = false;
  activities: StoreActivity[] = [];
  inventory: StoreInventory[] = [];
  items: Items[] = [];
  selectedActivity: StoreActivity | null = null;

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
      next: (data) => {
        this.items = data;
      },
      error: (err) => {
        console.error('Error loading items:', err);
        alert('Failed to load items. Please check if backend is running.');
      }
    });
  }

  loadActivities(): void {
    this.activityService.getAllActivities().subscribe({
      next: (data) => {
        this.activities = data;
      },
      error: (err) => {
        console.error('Error loading activities:', err);
        alert('Failed to load activities. Please check if backend is running.');
      }
    });
  }

  loadInventory(): void {
    this.inventoryService.getAllInventory().subscribe({
      next: (data) => {
        this.inventory = data;
      },
      error: (err) => {
        console.error('Error loading inventory:', err);
        alert('Failed to load inventory. Please check if backend is running.');
      }
    });
  }

  submitActivity(): void {
    if (!this.formData.item || !this.formData.sourceName) {
      alert('Please fill in all required fields');
      return;
    }

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

  editActivity(activity: StoreActivity): void {
    this.selectedActivity = activity;
    this.formData = {
      item: activity.item,
      transactionType: activity.transactionType,
      sourceType: activity.sourceType,
      sourceName: activity.sourceName,
      destinationType: activity.destinationType,
      destinationName: activity.destinationName,
      quantity: activity.quantity,
      remarks: activity.remarks
    };
    this.showEditForm = true;
  }

  updateActivity(): void {
    if (!this.selectedActivity || !this.formData.item || !this.formData.sourceName) {
      alert('Please fill in all required fields');
      return;
    }

    const updatedActivity: StoreActivity = {
      ...this.selectedActivity,
      item: this.formData.item,
      transactionType: this.formData.transactionType,
      sourceType: this.formData.sourceType,
      sourceName: this.formData.sourceName,
      destinationType: this.formData.destinationType,
      destinationName: this.formData.destinationName,
      quantity: this.formData.quantity,
      remarks: this.formData.remarks
    };

    // Note: You need to add update endpoint in backend
    // For now, we'll just close the form
    alert('Update functionality to be implemented in backend');
    this.cancelEdit();
  }

  deleteActivity(id: number): void {
    if (!confirm('Are you sure you want to delete this activity?')) {
      return;
    }

    // Note: You need to add delete endpoint in backend
    // For now, just show message
    alert('Delete functionality to be implemented in backend');
    // this.activityService.deleteActivity(id).subscribe({
    //   next: () => {
    //     alert('Activity deleted successfully!');
    //     this.loadActivities();
    //     this.loadInventory();
    //   },
    //   error: (err) => {
    //     console.error('Error deleting activity:', err);
    //     alert('Failed to delete activity');
    //   }
    // });
  }

  cancelEdit(): void {
    this.showEditForm = false;
    this.selectedActivity = null;
    this.resetForm();
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