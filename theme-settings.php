<?php
/**
 * Implementation of hook_form_system_theme_settings_alter()
 *
 * @param $form
 *   Nested array of form elements that comprise the form.
 *
 * @param $form_state
 *   A keyed array containing the current state of the form.
 */
function cua_theme_form_system_theme_settings_alter(&$form, &$form_state)
{
    $form['core'] = array(
        '#type' => 'vertical_tabs',
        '#attributes' => array('class' => array('entity-meta')),
        '#weight' => -899
    );

    $form['theme_settings']['#group'] = 'core';
    $form['logo']['#group'] = 'core';
    $form['favicon']['#group'] = 'core';

    $form['theme_settings']['#open'] = FALSE;
    $form['logo']['#open'] = FALSE;
    $form['favicon']['#open'] = FALSE;

    // Custom settings in Vertical Tabs container
    $form['options'] = array(
        '#type' => 'vertical_tabs',
        '#attributes' => array('class' => array('entity-meta')),
        '#weight' => -1001,
        '#default_tab' => 'edit-variables',
        '#states' => array(
            'invisible' => array(
                ':input[name="force_subtheme_creation"]' => array('checked' => TRUE),
            ),
        ),
    );

  /*--------- cu_theme Intro ------------ */

  $form['options']['cu_theme'] = array(
    '#type' => 'details',
    '#attributes' => array(),
    '#title' => t('CU Giving theme package'),
    '#description' => t('<p>CU Giving Communications-approved basic branding.</p>'),
    '#weight' => -1000,
    '#group' => 'options',
    '#open' => TRUE,
  );



    /*--------- Setting Header ------------ */
    $form['general'] = array(
        '#type' => 'details',
        '#attributes' => array(),
				'#title' => t('Header options'),
				'#description' => t('Configuration options for the CU header and site title and slogan.'),
        '#weight' => -997,
        '#group' => 'options',
        '#open' => FALSE,
    );

    // Title One URL
    $form['general']['title_one_url'] = array(
        '#type'           => 'textfield',
        '#title'          => t('Site Name URL'),
        '#description'    => t('Link the header site title to a URL. Supports a full URL (e.g. https://theme.gatech.edu) or the front page (/).'),
        '#default_value'  => theme_get_setting('title_one_url'),
    );

    // Title Two URL
    $form['general']['title_two_url'] = array(
        '#type'           => 'textfield',
        '#title'          => t('Site Slogan URL'),
        '#description'    => t('Link the header site slogan to a URL. Supports a full URL (e.g. https://theme.gatech.edu) or the front page (/).'),
        '#default_value'  => theme_get_setting('title_two_url'),
    );

    /*--------- Setting Breadcrumb ------------ */
    $form['page_settings'] = array(
        '#type' => 'details',
        '#title' => t('Breadcrumbs'),
        '#description' => t('Configuration options for Breadcrumbs under the menu, which show the navigation from the home page to the current page.'),
        '#weight' => -996,
        '#group' => 'options',
        '#open' => TRUE,
    );

    // Set up the checkbox to include/not include
    $form['page_settings']['hide_breadcrumb'] = array(
        '#type' => 'checkbox',
        '#title' => t('Disable breadcrumbs'),
        '#default_value' => theme_get_setting('hide_breadcrumb'),
        '#description' => t('Remove the breadcrumb links below the main menu'),
        '#options' => array(
            '0' => t('Disable'),
            '1' => t('Enable'),
        ),
    );

    /*--------- Setting SuperFooter ------------ */
    $form['footer_settings'] = array(
        '#type' => 'details',
        '#title' => t('SuperFooter'),
        '#description' => t('Customize'),
        '#weight' => -993,
        '#group' => 'options',
        '#open' => TRUE,
    );

    // Set up the checkbox to include/not include
    $form['footer_settings']['super_footer'] = array(
        '#type' => 'checkbox',
        '#title' => t('Enable SuperFooter'),
        '#default_value' => theme_get_setting('super_footer'),
        '#description' => t('Customize'),
        '#options' => array(
            '0' => t('Disable'),
            '1' => t('Enable'),
        ),
    );

    /*--------- Setting SuperFooter ------------ */

    // Dynamic Bootstrap columns for superfooter
    $form['footer_settings']['footer_01_size'] = array(
        '#type' => 'select',
        '#title' => t('First Column Size'),
        '#default_value' => theme_get_setting('footer_01_size') ? theme_get_setting('footer_01_size') : 3,
        '#options' => array('Default', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12),
        '#description' => 'Set the width of the SuperFooter column width. Default value is 3. Uses grid bootstrap / 12.'
    );

    $form['footer_settings']['footer_02_size'] = array(
        '#type' => 'select',
        '#title' => t('Second Column Size'),
        '#default_value' => theme_get_setting('footer_02_size') ? theme_get_setting('footer_02_size') : 3,
        '#options' => array('Default', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12),
        '#description' => 'Set the width of the SuperFooter column width. Default value is 3. Uses grid bootstrap / 12.'
    );

    $form['footer_settings']['footer_03_size'] = array(
        '#type' => 'select',
        '#title' => t('Third Column Size'),
        '#default_value' => theme_get_setting('footer_03_size') ? theme_get_setting('footer_03_size') : 3,
        '#options' => array('Default', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12),
        '#description' => 'Set the width of the SuperFooter column width. Default value is 3. Uses grid bootstrap / 12.'
    );

    $form['footer_settings']['footer_04_size'] = array(
        '#type' => 'select',
        '#title' => t('Fourth Column Size'),
        '#default_value' => theme_get_setting('footer_04_size') ? theme_get_setting('footer_04_size') : 3,
        '#options' => array('Default', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12),
        '#description' => 'Set the width of the SuperFooter column width. Default value is 3. Uses grid bootstrap / 12.'
    );

    // Save on submit
    $form['actions']['submit']['#value'] = t('Save');

}
