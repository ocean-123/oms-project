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
      next: (data) => {
        if (data && data.length > 0) {
          this.items = data;
        } else {
          this.loadStaticItems();
        }
      },
      error: (err) => {
        console.error('Error loading items:', err);
        this.loadStaticItems();
      }
    });
  }

  loadStaticItems(): void {
    this.items = [
      {
        id: 1,
        itemName: 'A4 Paper Ream',
        itemCode: 'ITEM001',
        category: { id: 1, categoryName: 'Stationary', description: 'Office Stationary' },
        description: 'High quality A4 size paper',
        unit: 'Ream',
        unitPrice: 500
      },
      {
        id: 2,
        itemName: 'Blue Pen',
        itemCode: 'ITEM002',
        category: { id: 1, categoryName: 'Stationary', description: 'Office Stationary' },
        description: 'Ball point pen blue color',
        unit: 'Piece',
        unitPrice: 20
      },
      {
        id: 3,
        itemName: 'Mobile Data Pack 50GB',
        itemCode: 'ITEM003',
        category: { id: 2, categoryName: 'Mobile', description: 'Mobile Services' },
        description: 'Monthly data pack 50GB',
        unit: 'Pack',
        unitPrice: 1200
      },
      {
        id: 4,
        itemName: 'Notebook',
        itemCode: 'ITEM004',
        category: { id: 1, categoryName: 'Stationary', description: 'Office Stationary' },
        description: '100 pages ruled notebook',
        unit: 'Piece',
        unitPrice: 80
      },
      {
        id: 5,
        itemName: 'Printer Toner',
        itemCode: 'ITEM005',
        category: { id: 3, categoryName: 'Electronics', description: 'Electronic Items' },
        description: 'HP Laser printer toner',
        unit: 'Piece',
        unitPrice: 3500
      },
      {
        id: 6,
        itemName: 'Stapler',
        itemCode: 'ITEM006',
        category: { id: 1, categoryName: 'Stationary', description: 'Office Stationary' },
        description: 'Heavy duty stapler',
        unit: 'Piece',
        unitPrice: 250
      }
    ];
  }

  loadActivities(): void {
    this.activityService.getAllActivities().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.activities = data;
        } else {
          this.loadStaticActivities();
        }
      },
      error: (err) => {
        console.error('Error loading activities:', err);
        this.loadStaticActivities();
      }
    });
  }

  loadStaticActivities(): void {
    const now = new Date();
    this.activities = [
      {
        id: 1,
        item: {
          id: 1,
          itemName: 'A4 Paper Ream',
          itemCode: 'ITEM001',
          category: { id: 1, categoryName: 'Stationary', description: 'Office Stationary' },
          description: 'High quality A4 size paper',
          unit: 'Ream',
          unitPrice: 500
        },
        transactionType: 'RECEIVED',
        sourceType: 'VENDOR',
        sourceName: 'ABC Stationers Pvt Ltd',
        destinationType: '',
        destinationName: '',
        quantity: 50,
        transactionDate: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        remarks: 'Bulk order received',
        processedBy: 'Admin'
      },
      {
        id: 2,
        item: {
          id: 2,
          itemName: 'Blue Pen',
          itemCode: 'ITEM002',
          category: { id: 1, categoryName: 'Stationary', description: 'Office Stationary' },
          description: 'Ball point pen blue color',
          unit: 'Piece',
          unitPrice: 20
        },
        transactionType: 'RECEIVED',
        sourceType: 'VENDOR',
        sourceName: 'XYZ Suppliers',
        destinationType: '',
        destinationName: '',
        quantity: 200,
        transactionDate: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        remarks: 'Monthly stock replenishment',
        processedBy: 'Admin'
      },
      {
        id: 3,
        item: {
          id: 3,
          itemName: 'Mobile Data Pack 50GB',
          itemCode: 'ITEM003',
          category: { id: 2, categoryName: 'Mobile', description: 'Mobile Services' },
          description: 'Monthly data pack 50GB',
          unit: 'Pack',
          unitPrice: 1200
        },
        transactionType: 'SENT',
        sourceType: 'INTERNAL',
        sourceName: 'Main Office',
        destinationType: 'BRANCH',
        destinationName: 'Lalitpur Branch',
        quantity: 10,
        transactionDate: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        remarks: 'Transferred to branch office',
        processedBy: 'Admin'
      },
      {
        id: 4,
        item: {
          id: 5,
          itemName: 'Printer Toner',
          itemCode: 'ITEM005',
          category: { id: 3, categoryName: 'Electronics', description: 'Electronic Items' },
          description: 'HP Laser printer toner',
          unit: 'Piece',
          unitPrice: 3500
        },
        transactionType: 'RECEIVED',
        sourceType: 'BRANCH',
        sourceName: 'Bhaktapur Branch',
        destinationType: '',
        destinationName: '',
        quantity: 5,
        transactionDate: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        remarks: 'Excess stock from branch',
        processedBy: 'Admin'
      },
      {
        id: 5,
        item: {
          id: 4,
          itemName: 'Notebook',
          itemCode: 'ITEM004',
          category: { id: 1, categoryName: 'Stationary', description: 'Office Stationary' },
          description: '100 pages ruled notebook',
          unit: 'Piece',
          unitPrice: 80
        },
        transactionType: 'SENT',
        sourceType: 'INTERNAL',
        sourceName: 'Main Store',
        destinationType: 'BRANCH',
        destinationName: 'Pokhara Branch',
        quantity: 30,
        transactionDate: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        remarks: 'Branch requirement',
        processedBy: 'Admin'
      }
    ];
  }

  loadInventory(): void {
    this.inventoryService.getAllInventory().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.inventory = data;
        } else {
          this.loadStaticInventory();
        }
      },
      error: (err) => {
        console.error('Error loading inventory:', err);
        this.loadStaticInventory();
      }
    });
  }

  loadStaticInventory(): void {
    this.inventory = [
      {
        id: 1,
        item: {
          id: 1,
          itemName: 'A4 Paper Ream',
          itemCode: 'ITEM001',
          category: { id: 1, categoryName: 'Stationary', description: 'Office Stationary' },
          description: 'High quality A4 size paper',
          unit: 'Ream',
          unitPrice: 500
        },
        currentStock: 45,
        minimumStock: 20,
        lastUpdated: new Date().toISOString()
      },
      {
        id: 2,
        item: {
          id: 2,
          itemName: 'Blue Pen',
          itemCode: 'ITEM002',
          category: { id: 1, categoryName: 'Stationary', description: 'Office Stationary' },
          description: 'Ball point pen blue color',
          unit: 'Piece',
          unitPrice: 20
        },
        currentStock: 180,
        minimumStock: 50,
        lastUpdated: new Date().toISOString()
      },
      {
        id: 3,
        item: {
          id: 3,
          itemName: 'Mobile Data Pack 50GB',
          itemCode: 'ITEM003',
          category: { id: 2, categoryName: 'Mobile', description: 'Mobile Services' },
          description: 'Monthly data pack 50GB',
          unit: 'Pack',
          unitPrice: 1200
        },
        currentStock: 8,
        minimumStock: 10,
        lastUpdated: new Date().toISOString()
      },
      {
        id: 4,
        item: {
          id: 4,
          itemName: 'Notebook',
          itemCode: 'ITEM004',
          category: { id: 1, categoryName: 'Stationary', description: 'Office Stationary' },
          description: '100 pages ruled notebook',
          unit: 'Piece',
          unitPrice: 80
        },
        currentStock: 65,
        minimumStock: 30,
        lastUpdated: new Date().toISOString()
      },
      {
        id: 5,
        item: {
          id: 5,
          itemName: 'Printer Toner',
          itemCode: 'ITEM005',
          category: { id: 3, categoryName: 'Electronics', description: 'Electronic Items' },
          description: 'HP Laser printer toner',
          unit: 'Piece',
          unitPrice: 3500
        },
        currentStock: 12,
        minimumStock: 5,
        lastUpdated: new Date().toISOString()
      },
      {
        id: 6,
        item: {
          id: 6,
          itemName: 'Stapler',
          itemCode: 'ITEM006',
          category: { id: 1, categoryName: 'Stationary', description: 'Office Stationary' },
          description: 'Heavy duty stapler',
          unit: 'Piece',
          unitPrice: 250
        },
        currentStock: 3,
        minimumStock: 10,
        lastUpdated: new Date().toISOString()
      }
    ];
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
        // Simulate success with static data
        alert('Activity recorded successfully! (Demo mode - Backend not connected)');
        this.resetForm();
        this.showForm = false;
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
