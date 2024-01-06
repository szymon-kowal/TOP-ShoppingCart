import { useEffect, useState } from 'react';
import React from 'react';
import type { CartDataProps } from '../pages/Root';

interface CartProps {
	data: CartDataProps[];
	handleDisplayCart: () => void;
	isCartDisplayed: boolean;
	removeCartItem: (itemID: string) => void;
}

const DisplayCart: React.FC<CartProps> = ({
	data,
	handleDisplayCart,
	isCartDisplayed,
	removeCartItem,
}) => {
	const [shouldRender, setShouldRender] = useState(isCartDisplayed);
	const [modalClass, setModalClass] = useState('');

	useEffect(() => {
		if (isCartDisplayed) {
			setShouldRender(true);
			setTimeout(() => {
				setModalClass('open');
			}, 50);
		} else if (shouldRender) {
			setModalClass('');
			const timer = setTimeout(() => {
				setShouldRender(false);
			}, 1000);
			// !!! : settimeout time = css animation

			return () => clearTimeout(timer);
		}
	}, [isCartDisplayed, shouldRender]);

	if (!shouldRender) {
		return null;
	}

	return (
		<div className={`card-modal ${modalClass}`}>
			<h2>Your Cart</h2>
			{data.map(dataItem => (
				<div key={dataItem.item.id + '-modal'} className="cart-item">
					<div className="item-title">{dataItem.item.title}</div>
					<div className="item-details">
						<span>Quantity: {dataItem.count}</span>
						<span>
							Price:{' '}
							{parseFloat(dataItem.item.price) * dataItem.count} $
						</span>
						<button
							onClick={() => {
								removeCartItem(dataItem.item.id);
							}}
						>
							remove
						</button>
					</div>
				</div>
			))}
			<div className="total-price">
				Total price is :{' '}
				{data.reduce(
					(sum, currentObj) =>
						sum +
						parseFloat(currentObj.item.price) * currentObj.count,
					0
				)}
				{' ' + '$'}
			</div>
			<button onClick={handleDisplayCart} className="btn close-cart">
				X
			</button>
		</div>
	);
};

export default DisplayCart;
