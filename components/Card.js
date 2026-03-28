import React from 'react';
import { View, StyleSheet } from 'react-native';
import theme from '../theme';

/**
 * Card Component — Design System compliant
 * Variants: base, large, compact
 * Support: elevation, custom borders
 */
export default function Card({
  children,
  variant = 'base',
  elevation = 'md',
  noPadding = false,
  style,
  ...props
}) {
  const getCardStyle = () => {
    const variantStyle = theme.components.card[variant] || theme.components.card.base;
    const shadowStyle = theme.shadows[elevation] || theme.shadows.md;

    return {
      ...variantStyle,
      ...shadowStyle,
      padding: noPadding ? 0 : variantStyle.padding,
    };
  };

  const cardStyle = getCardStyle();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: cardStyle.backgroundColor,
          borderRadius: cardStyle.borderRadius,
          padding: cardStyle.padding,
          ...cardStyle, // spread shadow properties
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
  },
});
