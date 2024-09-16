<?php

declare(strict_types=1);

namespace Drupal\ui_suite_bootstrap\HookHandler;

use Drupal\Component\Utility\Html;
use Drupal\Core\DependencyInjection\ContainerInjectionInterface;
use Drupal\Core\Routing\CurrentRouteMatch;
use Drupal\Core\Session\AccountProxyInterface;
use Drupal\Core\Url;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Add tabs on filter tips.
 */
class PreprocessFilterTips implements ContainerInjectionInterface {

  /**
   * The current route match.
   *
   * @var \Drupal\Core\Routing\CurrentRouteMatch
   */
  protected CurrentRouteMatch $currentRouteMatch;

  /**
   * The current user.
   *
   * @var \Drupal\Core\Session\AccountProxyInterface
   */
  protected AccountProxyInterface $currentUser;

  /**
   * Constructor.
   *
   * @param \Drupal\Core\Routing\CurrentRouteMatch $currentRouteMatch
   *   The current route match.
   * @param \Drupal\Core\Session\AccountProxyInterface $currentUser
   *   The current user.
   */
  public function __construct(
    CurrentRouteMatch $currentRouteMatch,
    AccountProxyInterface $currentUser,
  ) {
    $this->currentRouteMatch = $currentRouteMatch;
    $this->currentUser = $currentUser;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container): static {
    return new static(
      $container->get('current_route_match'),
      $container->get('current_user')
    );
  }

  /**
   * Add button style to local actions.
   *
   * @param array $variables
   *   The preprocessed variables.
   */
  public function preprocess(array &$variables): void {
    /** @var \Drupal\filter\FilterFormatInterface|null $current_format */
    $current_format = $this->currentRouteMatch->getParameter('filter_format');
    $current_format_id = $current_format ? $current_format->id() : FALSE;

    $build = [];
    $build['tabs'] = [
      '#type' => 'pattern',
      '#id' => 'nav',
      '#variant' => 'tabs',
      '#attributes' => [
        'class' => [
          'mb-3',
        ],
      ],
      '#items' => [],
    ];

    // Create a placeholder for the panes.
    $build['panes'] = [
      '#type' => 'container',
      '#attributes' => [
        'class' => [
          'tab-content',
        ],
      ],
    ];

    foreach (\filter_formats($this->currentUser) as $format_id => $format) {
      // Set the current format ID to the first format.
      if (!$current_format_id) {
        $current_format_id = $format_id;
      }
      $tab_id = Html::getId('tab-' . $format_id);
      $pane_id = Html::getId('pane-' . $format_id);
      $active = $current_format_id === $format_id;

      $tab = [
        '#type' => 'pattern',
        '#id' => 'nav_item',
        '#active' => $active,
        '#toggle' => $pane_id,
        '#link' => [
          '#type' => 'link',
          '#title' => $format->label(),
          '#url' => Url::fromRoute('filter.tips', [
            'filter_format' => $format_id,
          ]),
          '#attributes' => [
            'id' => $tab_id,
          ],
        ],
      ];
      $build['tabs']['#items'][] = $tab;

      // Construct the pane.
      $tips = [];
      // Iterate over each format's enabled filters.
      /** @var \Drupal\filter\FilterPluginCollection $filters */
      $filters = $format->filters();
      foreach ($filters->getAll() as $filter) {
        // Ignore filters that are not enabled.
        if (!$filter->status) {
          continue;
        }

        $tip = $filter->tips(TRUE);
        if (isset($tip)) {
          $tips[] = ['#markup' => $tip];
        }
      }

      $pane = [
        '#type' => 'container',
        '#attributes' => [
          'class' => [
            'tab-pane',
            'fade',
            $active ? 'active' : '',
            $active ? 'show' : '',
          ],
          'id' => $pane_id,
          'role' => 'tabpanel',
          'aria-labelledby' => $tab_id,
          'tabindex' => 0,
        ],
        'list' => [
          '#theme' => 'item_list',
          '#items' => $tips,
        ],
      ];
      $build['panes'][] = $pane;
    }

    $variables['tips'] = $build;
  }

}
