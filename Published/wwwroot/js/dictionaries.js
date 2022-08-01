export const bannerType = {
    mainBanner: 0,
    offerBanner: 1
}

export const promotionType = {
    cashback: 0, coupon: 1, delivery: 2
}

export const complainType =
{
    website: 0, delivery: 1, agentBehaviors: 2, products: 3, others: 4
}

export const complainStatus =
{
    new: 0, seen: 1, onHold: 2
}

export const registrationBy =
{
    customer: 0, admin: 1
}

export const addressType =
{
    home: 0, Office: 1, HomeTown: 2, Recent: 3
}

export const orderStatus =
{
    pending: 0, confirmed: 1, processing: 2, delivering: 3, delivered: 4, cancelledByCustomer: 5, all: 6, cancelledByAdmin: 7,  returned: 8
}

export const paymentStatus =
{
    Pending: 0, PartiallyPaid: 1, Paid: 2, PartiallyRefunded: 3, Refunded: 4
}

export const orderAction =
{
    Created: 0, StatusChanged: 1, PaymentStatusChanged: 2, CancelledByAdmin: 3, CancelledByCustomer: 4, paymentEntry: 5
}

export const paymentMethod =
{
    CashOnDelivery: 0
}

export const platformType =
{
    Web: 0, Mobile: 1
}

export const orderAquiredOfferType =
{
    Cashback: 0, Coupon: 1, Delivery: 2, Product: 3
}

export const REVIEW_STATUS = {
    PENDING: "PENDING",
    APPROVED: "APPROVED",
    DENIED: "DENIED",
    ON_HOLD: "ON HOLD",
};

export const ORDER_STATUS = {
    PENDING: 'PENDING',
    CONFIRMED: 'CONFIRMED',
    PROCESSING: 'PROCESSING',
    DELIVERING: 'DELIVERING',
    DELIVERED: 'DELIVERED',
    CANCELLED_BY_CUSTOMER: 'CANCELLED_BY_CUSTOMER',
    CANCELLED_BY_ADMIN: 'CANCELLED_BY_ADMIN',
    CANCELLED: 'CANCELLED',
    RETURNED: 'RETURNED',
    ALL: 'ALL'
};

