<?php

/**
 * @file
 * Theme settings for cua_theme.
 */

use Drupal\Core\Form\FormStateInterface;

/**
 * Implements hook_form_system_theme_settings_alter().
 *
 * Adds CUA-specific toggles to Appearance → Settings → CUA Theme.
 * Drupal auto-persists these values into cua_theme.settings on submit.
 */
function cua_theme_form_system_theme_settings_alter(array &$form, FormStateInterface $form_state): void {
  $form['cua_theme_header'] = [
    '#type' => 'details',
    '#title' => t('CUA header'),
    '#open' => TRUE,
    '#weight' => -20,
  ];

  $form['cua_theme_header']['display_slogan'] = [
    '#type' => 'checkbox',
    '#title' => t('Display site slogan in the header'),
    '#description' => t('Shows the Slogan from <em>Basic site settings</em> to the left of the main menu. Uncheck to hide it without deleting the slogan text.'),
    // Default ON; only an explicit un-check hides it.
    '#default_value' => theme_get_setting('display_slogan') ?? TRUE,
  ];
}
