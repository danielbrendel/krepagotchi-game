<?php 

/**
 * Class CmdGameBuildDebug
 * 
 * Command to make a debug build
 */
class CmdGameBuildDebug implements Asatru\Commands\Command  {
    /**
     * Command handler method
     * 
     * @param $args
     * @return void
     */
    public function handle($args)
    {
        $bundle = $args?->get(0)?->getValue(1) ?? 'html5';

        GameBuild::make($bundle, true);
    }
}