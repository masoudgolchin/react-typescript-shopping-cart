import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency";

type CartItemProps = {
  id: number;
  quantity: number;
};

type storeItemsType = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

export function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart } = useShoppingCart();
  const item: undefined | storeItemsType = storeItems.find(
    (item) => item.id === id
  );
  if (item === undefined) return null;
  return (
    <Stack
      direction="horizontal"
      gap={2}
      className="d - flex align-items-center"
    >
      <img
        src={item.imgUrl}
        alt={item.name}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {item.name}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.price === undefined ? 0 : +item.price)}
        </div>
      </div>
      <div>
        {formatCurrency(
          (item.price === undefined ? 0 : +item.price) * quantity
        )}
      </div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(id)}
      >
        &times;
      </Button>
    </Stack>
  );
}
