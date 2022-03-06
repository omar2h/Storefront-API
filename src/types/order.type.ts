enum order_status {
  ACTIVE,
  COMPLETE,
}

type Order = {
  id: string
  product_id: string
  quantity: number
  user_id: string
  status: order_status
}

export default Order
