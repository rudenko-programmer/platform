<?php

declare(strict_types=1);

namespace Orchid\Platform\Http\Controllers\Systems;

use Orchid\Widget\WidgetContractInterface;

/**
 * Class WidgetController.
 */
class WidgetController
{
    /**
     * @param WidgetContractInterface $widget
     * @param null $key
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(WidgetContractInterface $widget, $key = null)
    {
        $widget->query = request('term');
        $widget->key   = $key;

        $results = [];

        foreach ($widget->handler() as $key => $values) {
            $values = array_values($values);

            if (isset($values[1])) {
                array_push($results, [
                    'id'   => $values[0],
                    'text' => $values[1],
                ]);
            } else {
                array_push($results, [
                    'id'   => $values[0],
                    'text' => $values[0],
                ]);
            }
        }

        if (!is_null($key)) {
            return response()->json($widget->handler());
        }

        return response()->json([
            'results' => $widget->handler(),
        ]);
    }
}
