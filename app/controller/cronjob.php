<?php

/*
    Asatru PHP - Cronjob Controller
*/

/**
 * This class represents your controller
 */
class CronjobController extends BaseController {
    /**
	 * Perform base initialization
	 * 
	 * @return void
	 */
	public function __construct()
	{
		$token = $_GET['token'] ?? '';

        if ($token !== env('APP_ACCESSTOKEN')) {
            throw new \Exception('Invalid access token: ' . $token);
        }
	}

    /**
	 * Handles URL: /cronjob/letters/clean
	 * 
	 * @param Asatru\Controller\ControllerArg $request
	 * @return Asatru\View\JsonHandler
	 */
    public function clean_letters($request)
    {
        try {
            Letters::clean();

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
}
