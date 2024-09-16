<?php

declare(strict_types=1);

namespace Drupal\ui_suite_bootstrap\HookHandler;

use Drupal\Core\Url;

/**
 * Prepare local task link for component.
 */
class PreprocessMenuLocalTask {

  /**
   * Prepare local task link for component.
   *
   * @param array $variables
   *   The preprocessed variables.
   */
  public function preprocess(array &$variables): void {
    $variables['link'] = $this->convertLinkElement($variables['link']);
  }

  /**
   * Convert link element, which is not welcomed in a component template.
   *
   * @param array $link
   *   The link render element to transform.
   *
   * @return array
   *   An html_tag render element.
   */
  protected function convertLinkElement(array $link): array {
    if (!isset($link['#type'])) {
      return $link;
    }
    if ($link['#type'] !== 'link' || !($link['#url'] instanceof Url)) {
      return $link;
    }

    /** @var array $attributes */
    $attributes = $link['#url']->getOption('attributes') ?: [];
    $attributes['href'] = $link['#url']->toString();

    return [
      '#type' => 'html_tag',
      '#tag' => 'a',
      '#value' => $link['#title'] ?? '',
      '#attributes' => $attributes,
    ];
  }

}
