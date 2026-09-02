export type RoleType = 
  | 'Super Administrator'
  | 'Website Administrator'
  | 'Procurement Officer'
  | 'Booking Officer'
  | 'Finance Officer'
  | 'Content Editor'
  | 'Internal User'
  | 'Customer/Public User';

export interface User {
  id: string;
  name: string;
  email: string;
  role: RoleType;
  department?: string;
  nic?: string;
  mobile?: string;
  avatar?: string;
}

export type Language = 'en' | 'si' | 'ta';

export interface Product {
  id: string;
  name: string;
  code: string;
  category: 'Chemical Fertilizers' | 'Organic Fertilizers' | 'Specialized Blends' | 'Soil Conditioners';
  type: 'Nitrogenous' | 'Phosphatic' | 'Potassic' | 'Complex / NPK' | 'Organic';
  description: string;
  specifications: string;
  unit: string;
  packageSize: string;
  pricePerUnit: number;
  availableStock: number;
  isBulkAvailable: boolean;
  minQuantity: number;
  maxQuantity: number;
  image: string;
  effectiveDate: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  isFeatured?: boolean;
}

export interface OrderItem {
  productId: string;
  productName: string;
  unitPrice: number;
  quantity: number;
  unit: string;
  total: number;
}

export type OrderStatus = 
  | 'Pending'
  | 'Payment Pending'
  | 'Payment Successful'
  | 'Payment Failed'
  | 'Confirmed'
  | 'Processing'
  | 'Ready'
  | 'Completed'
  | 'Cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerNic: string;
  customerEmail: string;
  customerMobile: string;
  deliveryAddress: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  paymentMethod: 'BOC IPG' | 'People\'s Bank IPG' | 'Visa' | 'Mastercard';
  paymentStatus: 'Pending' | 'Successful' | 'Failed' | 'Refunded';
  orderStatus: OrderStatus;
  createdAt: string;
  transactionId?: string;
  erpSyncStatus: 'Pending' | 'Synced' | 'Failed';
  erpReference?: string;
}

export interface PaymentTransaction {
  id: string;
  transactionId: string;
  orderOrBookingRef: string;
  module: 'Product Sale' | 'Circuit Bungalow' | 'Tender Document';
  customerName: string;
  customerEmail: string;
  amount: number;
  gateway: 'BOC IPG' | 'People\'s Bank IPG' | 'Visa' | 'Mastercard';
  status: 'SUCCESS' | 'FAILED' | 'CANCELLED' | 'REFUNDED';
  timestamp: string;
  cardLast4?: string;
  failureReason?: string;
}

export interface BungalowRoom {
  id: string;
  bungalowId: string;
  roomNumber: string;
  roomName: string;
  capacity: number;
  bedType: string;
  pricePerNight: number;
  amenities: string[];
  status: 'Available' | 'Maintenance' | 'Blocked';
  image: string;
}

export interface Bungalow {
  id: string;
  name: string;
  location: string;
  address: string;
  contactNumber: string;
  description: string;
  image: string;
  rooms: BungalowRoom[];
}

export type BookingStatus = 
  | 'Pending Payment'
  | 'Payment Successful'
  | 'Pending Internal Approval'
  | 'Approved'
  | 'Rejected'
  | 'Cancelled'
  | 'Refund Requested'
  | 'Refunded';

export interface BungalowBooking {
  id: string;
  bookingRef: string;
  bungalowId: string;
  bungalowName: string;
  roomId: string;
  roomName: string;
  guestName: string;
  guestNic: string;
  guestEmail: string;
  guestMobile: string;
  isInternal: boolean;
  department?: string;
  purpose?: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfNights: number;
  totalFee: number;
  status: BookingStatus;
  rejectionReason?: string;
  paymentTransactionId?: string;
  createdAt: string;
  refundStatus?: 'None' | 'Requested' | 'Approved' | 'Processed';
  refundAmount?: number;
}

export type TenderStatus = 'Open' | 'Closing Soon' | 'Closed' | 'Cancelled';

export interface TenderDocument {
  id: string;
  title: string;
  fileName: string;
  fileSize: string;
  isPaid: boolean;
  documentFee: number;
}

export interface Tender {
  id: string;
  tenderRef: string;
  title: string;
  category: 'Fertilizer Supply' | 'Logistics & Transport' | 'Lab Equipment' | 'IT Infrastructure' | 'General Services';
  publishedDate: string;
  closingDate: string;
  description: string;
  status: TenderStatus;
  documents: TenderDocument[];
  purchasedBy?: string[]; // Array of user emails or transaction references
}

export interface TenderPurchaseRecord {
  id: string;
  tenderId: string;
  tenderRef: string;
  documentId: string;
  buyerName: string;
  buyerEmail: string;
  buyerMobile: string;
  companyName: string;
  amount: number;
  transactionId: string;
  purchasedAt: string;
  downloadCount: number;
}

export interface Inquiry {
  id: string;
  referenceNo: string;
  name: string;
  email: string;
  mobile: string;
  subject: string;
  category: 'General Information' | 'Fertilizer Availability' | 'Testing Lab Services' | 'Complaints' | 'Suggestions';
  message: string;
  status: 'New' | 'Assigned' | 'In Progress' | 'Responded' | 'Closed';
  assignedOfficer?: string;
  response?: string;
  respondedAt?: string;
  submittedAt: string;
}

export interface NewsItem {
  id: string;
  titleEn: string;
  titleSi: string;
  titleTa: string;
  summaryEn: string;
  summarySi: string;
  summaryTa: string;
  contentEn: string;
  contentSi: string;
  contentTa: string;
  category: 'Announcement' | 'Corporate' | 'Agricultural Notice' | 'Price Revision';
  publishedDate: string;
  image: string;
  isFeatured?: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
}

export interface FAQItem {
  id: string;
  questionEn: string;
  questionSi: string;
  questionTa: string;
  answerEn: string;
  answerSi: string;
  answerTa: string;
  category: 'General' | 'Products & Sales' | 'Bungalow Booking' | 'Procurement' | 'Lab Services';
}

export interface VacancyItem {
  id: string;
  title: string;
  department: string;
  closingDate: string;
  description: string;
  qualifications: string[];
  pdfUrl: string;
  status: 'Active' | 'Closed';
}

export interface JobApplication {
  id: string;
  vacancyId: string;
  positionTitle: string;
  applicantName: string;
  nic: string;
  email: string;
  mobile: string;
  qualifications: string;
  experienceYears: number;
  status: 'Received' | 'Under Review' | 'Shortlisted' | 'Rejected';
  appliedAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  type: 'image' | 'video';
  category: 'Events' | 'Factories & Warehouses' | 'Field Inspections' | 'CSR Initiatives';
  url: string;
  thumbnail: string;
  date: string;
  videoDuration?: string;
}

export interface MinisterMessage {
  ministerName: string;
  title: string;
  ministry: string;
  photo: string;
  quote: string;
  messageBody: string[];
}

export interface BoardMember {
  id: string;
  name: string;
  designation: string;
  department: string;
  photo: string;
  bio: string;
  qualifications: string;
  type: 'board' | 'executive';
}

export interface AnnualReport {
  id: string;
  year: string;
  title: string;
  summary: string;
  fileSize: string;
  pdfUrl: string;
  highlights: string[];
}

export interface VisitorAnalytics {
  liveOnline: number;
  todayVisits: number;
  totalVisitors: number;
  pageViews: number;
  lastUpdated: string;
}

export interface AuditLog {
  id: string;
  user: string;
  role: string;
  action: string;
  module: string;
  details: string;
  timestamp: string;
  ipAddress: string;
}

export interface ERPSyncLog {
  id: string;
  orderId: string;
  orderNumber: string;
  amount: number;
  status: 'Synced' | 'Pending' | 'Failed';
  erpReference?: string;
  syncedAt: string;
  retryCount: number;
}

