import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../theme';

/**
 * Button Component — Design System compliant
 * Variants: primary, secondary, outline, ghost
 * Sizes: small, medium (default), large
 */
export default function Button({
  children,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  style,
  textStyle,
  ...props
}) {
  const getButtonStyle = () => {
    const baseStyle = theme.components.button[variant] || theme.components.button.primary;
    const sizeStyle = size !== 'medium' ? theme.components.button[size] : {};

    return {
      ...baseStyle,
      ...sizeStyle,
      opacity: disabled ? 0.5 : 1,
    };
  };

  const buttonStyle = getButtonStyle();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          backgroundColor: buttonStyle.backgroundColor,
          paddingVertical: buttonStyle.paddingVertical,
          paddingHorizontal: buttonStyle.paddingHorizontal,
          borderRadius: buttonStyle.borderRadius,
          minHeight: buttonStyle.minHeight,
          borderWidth: buttonStyle.borderWidth || 0,
          borderColor: buttonStyle.borderColor || 'transparent',
          width: fullWidth ? '100%' : 'auto',
        },
        style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={buttonStyle.color} />
      ) : (
        <View style={styles.content}>
          {icon && iconPosition === 'left' && (
            <Ionicons
              name={icon}
              size={size === 'large' ? 24 : size === 'small' ? 18 : 20}
              color={buttonStyle.color}
              style={styles.iconLeft}
            />
          )}
          <Text
            style={[
              styles.text,
              {
                color: buttonStyle.color,
                fontSize: buttonStyle.fontSize,
                fontWeight: buttonStyle.fontWeight,
              },
              textStyle,
            ]}
          >
            {children}
          </Text>
          {icon && iconPosition === 'right' && (
            <Ionicons
              name={icon}
              size={size === 'large' ? 24 : size === 'small' ? 18 : 20}
              color={buttonStyle.color}
              style={styles.iconRight}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
  iconLeft: {
    marginRight: theme.spacing[2],
  },
  iconRight: {
    marginLeft: theme.spacing[2],
  },
});
