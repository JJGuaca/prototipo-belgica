<?php

declare(strict_types=1);

namespace Drupal\layout_options\Plugin\LayoutOption;

use Drupal\Core\Form\FormStateInterface;
use Drupal\layout_options\OptionBase;

/**
 * Layout Option plugin to add one or more classes via select set.
 *
 * @LayoutOption(
 *     id = "layout_options_class_select",
 *     label = @Translation("Layout Class attribute option (Select)"),
 *     description = @Translation("A layout configuration option that adds an class attributes to layout and/or regions")
 * )
 */
class ClassAttributeSelect extends OptionBase {

  /**
   * {@inheritdoc}
   */
  public function validateFormOption(array &$form, FormStateInterface $formState): void {
    $def = $this->getDefinition();
    $this->validateCssIdentifier($form, $formState, (bool) $def['multi']);
  }

  /**
   * {@inheritdoc}
   */
  public function processFormOption(string $region, array $form, FormStateInterface $formState, $default): array {
    return $this->createSelectElement($region, $form, $formState, $default);
  }

  /**
   * {@inheritdoc}
   */
  public function processOptionBuild(array $regions, array $build, string $region, $value): array {
    return $this->processAttributeOptionBuild('class', $regions, $build, $region, $value);
  }

  /**
   * {@inheritdoc}
   */
  public function getDefinitionAttributes(): array {
    return \array_merge(parent::getDefinitionAttributes(), [
      'multi' => 'boolean',
      'options' => 'array',
    ]);
  }

}
