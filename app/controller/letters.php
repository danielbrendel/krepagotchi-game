<?php

/**
 * Class LettersController
 * 
 * Handle letter requests
 */
class LettersController extends BaseController {
    /**
	 * Perform base initialization
	 * 
	 * @return void
	 */
	public function __construct()
	{
        $enabled = env('APP_ENABLELETTERS', false);
        $method = $_SERVER['REQUEST_METHOD'];

        if (!$enabled) {
            http_response_code(403);
            exit();
        }

        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
            header('Access-Control-Allow-Headers: ' . $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']);
        }

        if ($method === 'OPTIONS') {
		    http_response_code(200);
            exit();
        }
	}

    /**
	 * Handles URL: /letters/pick
	 * 
	 * @param Asatru\Controller\ControllerArg $request
	 * @return Asatru\View\JsonHandler
	 */
    public function pick($request)
    {
        try {
            $data = Letters::pick();

            if (!$data) {
                throw new \Exception('There are currently no messages available');
            }

            return json([
                'code' => 200,
                'data' => [
                    'pet' => $data->get('pet'),
                    'message' => $data->get('content'),
                    'date' => date('Y-m-d', strtotime($data->get('created_at')))
                ]
            ]);
        } catch (\Exception $e) {
            return json([
                'code' => 500,
                'msg' => $e->getMessage()
            ]);
        }
    }

    /**
	 * Handles URL: /letters/add
	 * 
	 * @param Asatru\Controller\ControllerArg $request
	 * @return Asatru\View\JsonHandler
	 */
    public function add($request)
    {
        try {
            $pet = $request->params()->query('pet');
            $message = $request->params()->query('message');

            Letters::add($pet, $message);

            return json([
                'code' => 200
            ]);
        } catch (\Exception $e) {
            return json([
                'code' => 500,
                'msg' => $e->getMessage()
            ]);
        }
    }

    /**
	 * Handles URL: /letters/check/{type}
	 * 
	 * @param Asatru\Controller\ControllerArg $request
	 * @return Asatru\View\JsonHandler
	 */
    public function check($request)
    {
        try {
            $type = $request->arg('type');
            $status = Letters::check($type);

            return json([
                'code' => 200,
                'status' => $status
            ]);
        } catch (\Exception $e) {
            return json([
                'code' => 500,
                'msg' => $e->getMessage()
            ]);
        }
    }
}
